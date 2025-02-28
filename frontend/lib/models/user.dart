class User {
  final String id;
  final String email;
  final String firstName;
  final String lastName;
  final String role;
  final String? gymId;
  final String? profilePicture;

  User({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.role,
    this.gymId,
    this.profilePicture,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      role: json['role'],
      gymId: json['gymId'],
      profilePicture: json['profilePicture'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'role': role,
      'gymId': gymId,
      'profilePicture': profilePicture,
    };
  }

  String get fullName => '$firstName $lastName';
}
