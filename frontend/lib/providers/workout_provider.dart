import 'package:flutter/material.dart';
import 'package:gym_app/models/workout.dart';
import 'package:gym_app/models/exercise.dart';
import 'package:gym_app/services/api_service.dart';
import 'package:uuid/uuid.dart';

class WorkoutProvider with ChangeNotifier {
  List<Workout> _workouts = [];
  List<Exercise> _exercises = [];
  bool _isLoading = false;
  String? _error;
  final Uuid _uuid = const Uuid();

  List<Workout> get workouts => [..._workouts];
  List<Exercise> get exercises => [..._exercises];
  bool get isLoading => _isLoading;
  String? get error => _error;

  // Get workouts for the current user
  Future<void> fetchWorkouts(String token, String userId) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final data = await ApiService.getWorkouts(token, userId);
      _workouts = data.map((w) => Workout.fromJson(w)).toList();
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Get all available exercises
  Future<void> fetchExercises(String token) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final data = await ApiService.getExercises(token);
      _exercises = data.map((e) => Exercise.fromJson(e)).toList();
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Create a new workout
  Future<Workout?> createWorkout(String token, Workout workout) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final data = await ApiService.createWorkout(token, workout.toJson());
      final newWorkout = Workout.fromJson(data);
      _workouts.add(newWorkout);
      notifyListeners();
      return newWorkout;
    } catch (e) {
      _error = e.toString();
      return null;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Update an existing workout
  Future<bool> updateWorkout(String token, Workout workout) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await ApiService.updateWorkout(token, workout.id, workout.toJson());
      final index = _workouts.indexWhere((w) => w.id == workout.id);
      if (index >= 0) {
        _workouts[index] = workout;
        notifyListeners();
      }
      return true;
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Delete a workout
  Future<bool> deleteWorkout(String token, String workoutId) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await ApiService.deleteWorkout(token, workoutId);
      _workouts.removeWhere((w) => w.id == workoutId);
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Create a workout template (for offline use or quick creation)
  Workout createWorkoutTemplate(String userId, String name, String description) {
    return Workout(
      id: _uuid.v4(),
      name: name,
      description: description,
      date: DateTime.now(),
      exercises: [],
      userId: userId,
    );
  }

  // Add exercise to a workout
  WorkoutExercise addExerciseToWorkout(Workout workout, Exercise exercise) {
    final workoutExercise = WorkoutExercise(
      id: _uuid.v4(),
      exerciseId: exercise.id,
      name: exercise.name,
      imageUrl: exercise.imageUrl,
      sets: [
        ExerciseSet(
          id: _uuid.v4(),
          setNumber: 1,
          weight: 0,
          reps: 10,
        ),
      ],
    );

    final updatedExercises = [...workout.exercises, workoutExercise];
    final updatedWorkout = workout.copyWith(exercises: updatedExercises);
    
    final index = _workouts.indexWhere((w) => w.id == workout.id);
    if (index >= 0) {
      _workouts[index] = updatedWorkout;
      notifyListeners();
    }
    
    return workoutExercise;
  }

  // Get workouts for a specific date
  List<Workout> getWorkoutsForDate(DateTime date) {
    final day = DateTime(date.year, date.month, date.day);
    return _workouts.where((workout) {
      final workoutDay = DateTime(
        workout.date.year,
        workout.date.month,
        workout.date.day,
      );
      return workoutDay.isAtSameMomentAs(day);
    }).toList();
  }

  // Get workouts for a specific week
  List<Workout> getWorkoutsForWeek(DateTime weekStart) {
    final weekEnd = weekStart.add(const Duration(days: 6));
    return _workouts.where((workout) {
      return workout.date.isAfter(weekStart.subtract(const Duration(days: 1))) &&
          workout.date.isBefore(weekEnd.add(const Duration(days: 1)));
    }).toList();
  }

  // Mark a workout as completed
  Future<bool> completeWorkout(String token, Workout workout) async {
    final completedWorkout = workout.copyWith(isCompleted: true);
    return updateWorkout(token, completedWorkout);
  }
} 