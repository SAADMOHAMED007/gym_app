import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:gym_app/models/workout.dart';
import 'package:gym_app/providers/auth_provider.dart';
import 'package:gym_app/providers/workout_provider.dart';
import 'package:intl/intl.dart';

class WorkoutDetailScreen extends StatefulWidget {
  final Workout workout;

  const WorkoutDetailScreen({
    super.key,
    required this.workout,
  });

  @override
  State<WorkoutDetailScreen> createState() => _WorkoutDetailScreenState();
}

class _WorkoutDetailScreenState extends State<WorkoutDetailScreen> {
  late Workout _workout;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _workout = widget.workout;
  }

  Future<void> _completeWorkout() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final workoutProvider = Provider.of<WorkoutProvider>(context, listen: false);
      
      if (authProvider.isAuthenticated) {
        final success = await workoutProvider.completeWorkout(
          authProvider.token!,
          _workout,
        );
        
        if (success && mounted) {
          setState(() {
            _workout = _workout.copyWith(isCompleted: true);
          });
          
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Workout completed!')),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to complete workout: $e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _deleteWorkout() async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Delete Workout'),
        content: const Text('Are you sure you want to delete this workout?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            child: const Text('Delete'),
          ),
        ],
      ),
    );

    if (confirmed != true) return;

    setState(() {
      _isLoading = true;
    });

    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final workoutProvider = Provider.of<WorkoutProvider>(context, listen: false);
      
      if (authProvider.isAuthenticated) {
        final success = await workoutProvider.deleteWorkout(
          authProvider.token!,
          _workout.id,
        );
        
        if (success && mounted) {
          Navigator.of(context).pop();
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Workout deleted')),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to delete workout: $e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('EEEE, MMMM d, y');
    final timeFormat = DateFormat('h:mm a');

    return Scaffold(
      appBar: AppBar(
        title: Text(_workout.name),
        actions: [
          IconButton(
            icon: const Icon(Icons.delete),
            onPressed: _isLoading ? null : _deleteWorkout,
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            dateFormat.format(_workout.date),
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                          const SizedBox(height: 8),
                          Text(
                            timeFormat.format(_workout.date),
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Duration: ${_workout.duration.inMinutes} minutes',
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                          if (_workout.description.isNotEmpty) ...[
                            const SizedBox(height: 16),
                            Text(
                              'Description:',
                              style: Theme.of(context).textTheme.titleMedium,
                            ),
                            const SizedBox(height: 8),
                            Text(_workout.description),
                          ],
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Text(
                    'Exercises',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 16),
                  _workout.exercises.isEmpty
                      ? const Center(
                          child: Text('No exercises added to this workout'),
                        )
                      : ListView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: _workout.exercises.length,
                          itemBuilder: (context, index) {
                            final exercise = _workout.exercises[index];
                            return ExerciseListItem(exercise: exercise);
                          },
                        ),
                ],
              ),
            ),
      bottomNavigationBar: _workout.isCompleted
          ? const BottomAppBar(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Text(
                  'Workout Completed',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.green,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            )
          : BottomAppBar(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _completeWorkout,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                  ),
                  child: const Text('Complete Workout'),
                ),
              ),
            ),
    );
  }
}

class ExerciseListItem extends StatelessWidget {
  final WorkoutExercise exercise;

  const ExerciseListItem({
    super.key,
    required this.exercise,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    exercise.name,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                ),
                if (exercise.isCompleted)
                  const Icon(Icons.check_circle, color: Colors.green),
              ],
            ),
            const SizedBox(height: 16),
            const Text(
              'Sets:',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: exercise.sets.length,
              itemBuilder: (context, index) {
                final set = exercise.sets[index];
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    children: [
                      Text('Set ${set.setNumber}:'),
                      const SizedBox(width: 8),
                      if (set.weight != null) Text('${set.weight} kg'),
                      const SizedBox(width: 8),
                      if (set.reps != null) Text('${set.reps} reps'),
                      const Spacer(),
                      if (set.isCompleted)
                        const Icon(Icons.check, color: Colors.green, size: 16),
                    ],
                  ),
                );
              },
            ),
            if (exercise.notes != null && exercise.notes!.isNotEmpty) ...[
              const SizedBox(height: 16),
              const Text(
                'Notes:',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Text(exercise.notes!),
            ],
          ],
        ),
      ),
    );
  }
} 