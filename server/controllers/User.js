import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

// User Registration
export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use."));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, img });
    const createdUser = await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, { expiresIn: "9999 years" });
    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

// User Login
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "9999 years" });
    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

// Get User Dashboard
export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const currentDate = new Date();
    const startToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endToday = new Date(startToday);
    endToday.setDate(endToday.getDate() + 1);

    // Calculate total calories burnt
    const totalCaloriesBurntData = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      { $group: { _id: null, totalCaloriesBurnt: { $sum: "$caloriesBurned" } } },
    ]);

    const totalCaloriesBurnt = totalCaloriesBurntData.length > 0 ? totalCaloriesBurntData[0].totalCaloriesBurnt : 0;

    // Calculate total number of workouts
    const totalWorkouts = await Workout.countDocuments({ user: userId, date: { $gte: startToday, $lt: endToday } });

    // Calculate average calories burnt per workout
    const avgCaloriesBurntPerWorkout = totalWorkouts ? totalCaloriesBurnt / totalWorkouts : 0;

    // Fetch workout categories and calories burnt
    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      { $group: { _id: "$category", totalCaloriesBurnt: { $sum: "$caloriesBurned" } } },
    ]);

    // Format category data for pie chart
    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    // Prepare weekly data
    const weeks = [];
    const caloriesBurnt = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);

      const weekData = await Workout.aggregate([
        { $match: { user: user._id, date: { $gte: startOfDay, $lt: endOfDay } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, totalCaloriesBurnt: { $sum: "$caloriesBurned" } } },
        { $sort: { _id: 1 } },
      ]);

      caloriesBurnt.push(weekData[0]?.totalCaloriesBurnt || 0);
    }

    return res.status(200).json({
      totalCaloriesBurnt,
      totalWorkouts,
      avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: { weeks, caloriesBurned: caloriesBurnt },
      pieChartData,
    });
  } catch (err) {
    next(err);
  }
};

// Get Workouts by Date
export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    const date = req.query.date ? new Date(req.query.date) : new Date();
    
    if (!user) {
      return next(createError(404, "User not found"));
    }
    
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const todaysWorkouts = await Workout.find({ user: userId, date: { $gte: startOfDay, $lt: endOfDay } });
    const totalCaloriesBurnt = todaysWorkouts.reduce((total, workout) => total + workout.caloriesBurned, 0);

    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err);
  }
};

// Add Workout
export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { workoutString } = req.body;

    if (!workoutString) {
      return next(createError(400, "Workout string is missing"));
    }

    const eachWorkout = workoutString.split(";").map(line => line.trim());
    const categories = eachWorkout.filter(line => line.startsWith("#"));
    
    if (categories.length === 0) {
      return next(createError(400, "No categories found in workout string"));
    }

    const parsedWorkouts = [];
    let currentCategory = "";

    await Promise.all(eachWorkout.map(async (line, index) => {
      if (line.startsWith("#")) {
        const parts = line.split("\n").map(part => part.trim());
        if (parts.length < 5) {
          return next(createError(400, `Workout string is missing for ${index + 1}th workout`));
        }

        currentCategory = parts[0].substring(1).trim();
        const workoutDetails = parseWorkoutLine(parts);
        
        if (!workoutDetails) {
          return next(createError(400, "Please enter in proper format"));
        }

        workoutDetails.category = currentCategory;
        workoutDetails.caloriesBurned = calculateCaloriesBurnt(workoutDetails);
        parsedWorkouts.push({ ...workoutDetails, user: userId });
      } else {
        return next(createError(400, `Workout string is missing for ${index + 1}th workout`));
      }
    }));

    await Workout.insertMany(parsedWorkouts);

    return res.status(201).json({
      message: "Workouts added successfully",
      workouts: parsedWorkouts,
    });
  } catch (err) {
    next(err);
  }
};

// Function to parse workout details from a line
const parseWorkoutLine = (parts) => {
  if (parts.length >= 5) {
    return {
      workoutName: parts[1].substring(1).trim(),
      sets: parseInt(parts[2].split("sets")[0].substring(1).trim(), 10),
      reps: parseInt(parts[2].split("sets")[1].split("reps")[0].substring(1).trim(), 10),
      weight: parseFloat(parts[3].split("kg")[0].substring(1).trim()),
      duration: parseFloat(parts[4].split("min")[0].substring(1).trim()),
    };
  }
  return null;
};

// Function to calculate calories burnt for a workout
const calculateCaloriesBurnt = (workoutDetails) => {
  const durationInMinutes = workoutDetails.duration;
  const weightInKg = workoutDetails.weight;
  const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
  return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};
