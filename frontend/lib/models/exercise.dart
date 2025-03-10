class Exercise {
  final String id;
  final String name;
  final String description;
  final String? imageUrl;
  final String? videoUrl;
  final List<String> muscleGroups;
  final String difficulty;
  final String? equipment;
  final List<String>? instructions;

  Exercise({
    required this.id,
    required this.name,
    required this.description,
    this.imageUrl,
    this.videoUrl,
    required this.muscleGroups,
    required this.difficulty,
    this.equipment,
    this.instructions,
  });

  factory Exercise.fromJson(Map<String, dynamic> json) {
    return Exercise(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      imageUrl: json['imageUrl'],
      videoUrl: json['videoUrl'],
      muscleGroups: List<String>.from(json['muscleGroups'] ?? []),
      difficulty: json['difficulty'] ?? 'Beginner',
      equipment: json['equipment'],
      instructions: json['instructions'] != null
          ? List<String>.from(json['instructions'])
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'imageUrl': imageUrl,
      'videoUrl': videoUrl,
      'muscleGroups': muscleGroups,
      'difficulty': difficulty,
      'equipment': equipment,
      'instructions': instructions,
    };
  }
} 