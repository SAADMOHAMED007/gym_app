import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:gym_app/models/workout.dart';
import 'package:gym_app/providers/auth_provider.dart';
import 'package:gym_app/providers/workout_provider.dart';
import 'package:gym_app/screens/workout/create_workout_screen.dart';
import 'package:gym_app/screens/workout/workout_detail_screen.dart';
import 'package:intl/intl.dart';

class WorkoutCalendarScreen extends StatefulWidget {
  const WorkoutCalendarScreen({super.key});

  @override
  State<WorkoutCalendarScreen> createState() => _WorkoutCalendarScreenState();
}

class _WorkoutCalendarScreenState extends State<WorkoutCalendarScreen> {
  CalendarFormat _calendarFormat = CalendarFormat.month;
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _selectedDay = _focusedDay;
    _fetchWorkouts();
  }

  Future<void> _fetchWorkouts() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final workoutProvider = Provider.of<WorkoutProvider>(context, listen: false);
      
      if (authProvider.isAuthenticated && authProvider.user != null) {
        await workoutProvider.fetchWorkouts(
          authProvider.token!,
          authProvider.user!.id,
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load workouts: $e')),
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

  List<Workout> _getWorkoutsForDay(DateTime day) {
    final workoutProvider = Provider.of<WorkoutProvider>(context, listen: false);
    return workoutProvider.getWorkoutsForDate(day);
  }

  @override
  Widget build(BuildContext context) {
    final workoutProvider = Provider.of<WorkoutProvider>(context);
    final workoutsForSelectedDay = _selectedDay != null
        ? _getWorkoutsForDay(_selectedDay!)
        : <Workout>[];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Workout Calendar'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _fetchWorkouts,
          ),
        ],
      ),
      body: Column(
        children: [
          TableCalendar(
            firstDay: DateTime.utc(2020, 1, 1),
            lastDay: DateTime.utc(2030, 12, 31),
            focusedDay: _focusedDay,
            calendarFormat: _calendarFormat,
            eventLoader: _getWorkoutsForDay,
            selectedDayPredicate: (day) {
              return isSameDay(_selectedDay, day);
            },
            onDaySelected: (selectedDay, focusedDay) {
              setState(() {
                _selectedDay = selectedDay;
                _focusedDay = focusedDay;
              });
            },
            onFormatChanged: (format) {
              setState(() {
                _calendarFormat = format;
              });
            },
            onPageChanged: (focusedDay) {
              _focusedDay = focusedDay;
            },
            calendarStyle: const CalendarStyle(
              markersMaxCount: 3,
              markerDecoration: BoxDecoration(
                color: Colors.blue,
                shape: BoxShape.circle,
              ),
            ),
          ),
          const SizedBox(height: 16),
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : workoutsForSelectedDay.isEmpty
                    ? const Center(
                        child: Text('No workouts scheduled for this day'),
                      )
                    : ListView.builder(
                        itemCount: workoutsForSelectedDay.length,
                        itemBuilder: (context, index) {
                          final workout = workoutsForSelectedDay[index];
                          return WorkoutListItem(
                            workout: workout,
                            onTap: () {
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (context) => WorkoutDetailScreen(
                                    workout: workout,
                                  ),
                                ),
                              ).then((_) => _fetchWorkouts());
                            },
                          );
                        },
                      ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => CreateWorkoutScreen(
                initialDate: _selectedDay ?? DateTime.now(),
              ),
            ),
          ).then((_) => _fetchWorkouts());
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}

class WorkoutListItem extends StatelessWidget {
  final Workout workout;
  final VoidCallback onTap;

  const WorkoutListItem({
    super.key,
    required this.workout,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final timeFormat = DateFormat('h:mm a');
    
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        title: Text(
          workout.name,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            decoration: workout.isCompleted ? TextDecoration.lineThrough : null,
          ),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(timeFormat.format(workout.date)),
            Text('${workout.exercises.length} exercises'),
          ],
        ),
        trailing: workout.isCompleted
            ? const Icon(Icons.check_circle, color: Colors.green)
            : const Icon(Icons.fitness_center),
        onTap: onTap,
      ),
    );
  }
} 