
class Workout {
  final String id;
  final String name;
  final String description;
  final DateTime date;
  final List<WorkoutExercise> exercises;
  final String userId;
  final bool isCompleted;
  final Duration duration;

  Workout({
    required this.id,
    required this.name,
    required this.description,
    required this.date,
    required this.exercises,
    required this.userId,
    this.isCompleted = false,
    this.duration = const Duration(minutes: 60),
  });

  factory Workout.fromJson(Map<String, dynamic> json) {
    return Workout(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      date: DateTime.parse(json['date']),
      exercises: (json['exercises'] as List)
          .map((e) => WorkoutExercise.fromJson(e))
          .toList(),
      userId: json['userId'],
      isCompleted: json['isCompleted'] ?? false,
      duration: Duration(minutes: json['durationMinutes'] ?? 60),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'date': date.toIso8601String(),
      'exercises': exercises.map((e) => e.toJson()).toList(),
      'userId': userId,
      'isCompleted': isCompleted,
      'durationMinutes': duration.inMinutes,
    };
  }

  Workout copyWith({
    String? id,
    String? name,
    String? description,
    DateTime? date,
    List<WorkoutExercise>? exercises,
    String? userId,
    bool? isCompleted,
    Duration? duration,
  }) {
    return Workout(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      date: date ?? this.date,
      exercises: exercises ?? this.exercises,
      userId: userId ?? this.userId,
      isCompleted: isCompleted ?? this.isCompleted,
      duration: duration ?? this.duration,
    );
  }
}

class WorkoutExercise {
  final String id;
  final String exerciseId;
  final String name;
  final String? imageUrl;
  final List<ExerciseSet> sets;
  final String? notes;
  final bool isCompleted;

  WorkoutExercise({
    required this.id,
    required this.exerciseId,
    required this.name,
    this.imageUrl,
    required this.sets,
    this.notes,
    this.isCompleted = false,
  });

  factory WorkoutExercise.fromJson(Map<String, dynamic> json) {
    return WorkoutExercise(
      id: json['id'],
      exerciseId: json['exerciseId'],
      name: json['name'],
      imageUrl: json['imageUrl'],
      sets: (json['sets'] as List).map((s) => ExerciseSet.fromJson(s)).toList(),
      notes: json['notes'],
      isCompleted: json['isCompleted'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'exerciseId': exerciseId,
      'name': name,
      'imageUrl': imageUrl,
      'sets': sets.map((s) => s.toJson()).toList(),
      'notes': notes,
      'isCompleted': isCompleted,
    };
  }

  WorkoutExercise copyWith({
    String? id,
    String? exerciseId,
    String? name,
    String? imageUrl,
    List<ExerciseSet>? sets,
    String? notes,
    bool? isCompleted,
  }) {
    return WorkoutExercise(
      id: id ?? this.id,
      exerciseId: exerciseId ?? this.exerciseId,
      name: name ?? this.name,
      imageUrl: imageUrl ?? this.imageUrl,
      sets: sets ?? this.sets,
      notes: notes ?? this.notes,
      isCompleted: isCompleted ?? this.isCompleted,
    );
  }
}

class ExerciseSet {
  final String id;
  final int setNumber;
  final double? weight;
  final int? reps;
  final Duration? duration;
  final bool isCompleted;

  ExerciseSet({
    required this.id,
    required this.setNumber,
    this.weight,
    this.reps,
    this.duration,
    this.isCompleted = false,
  });

  factory ExerciseSet.fromJson(Map<String, dynamic> json) {
    return ExerciseSet(
      id: json['id'],
      setNumber: json['setNumber'],
      weight: json['weight']?.toDouble(),
      reps: json['reps'],
      duration: json['durationSeconds'] != null
          ? Duration(seconds: json['durationSeconds'])
          : null,
      isCompleted: json['isCompleted'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'setNumber': setNumber,
      'weight': weight,
      'reps': reps,
      'durationSeconds': duration?.inSeconds,
      'isCompleted': isCompleted,
    };
  }

  ExerciseSet copyWith({
    String? id,
    int? setNumber,
    double? weight,
    int? reps,
    Duration? duration,
    bool? isCompleted,
  }) {
    return ExerciseSet(
      id: id ?? this.id,
      setNumber: setNumber ?? this.setNumber,
      weight: weight ?? this.weight,
      reps: reps ?? this.reps,
      duration: duration ?? this.duration,
      isCompleted: isCompleted ?? this.isCompleted,
    );
  }
} 