import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Use 10.0.2.2 instead of localhost for Android emulator
  static const String baseUrl = 'http://10.0.2.2:3000';
  static const headers = {'Content-Type': 'application/json'};

  static Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: headers,
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to login: ${response.body}');
    }
  }

  static Future<Map<String, dynamic>> register(Map<String, dynamic> userData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: headers,
      body: jsonEncode(userData),
    );

    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to register: ${response.body}');
    }
  }

  static Future<Map<String, dynamic>> getProfile(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/auth/profile'),
      headers: {
        ...headers,
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to get profile: ${response.body}');
    }
  }

  static Future<List<dynamic>> getCourses(String token, {String? gymId}) async {
    final uri = Uri.parse('$baseUrl/courses').replace(
      queryParameters: gymId != null ? {'gymId': gymId} : null,
    );

    final response = await http.get(
      uri,
      headers: {
        ...headers,
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to get courses: ${response.body}');
    }
  }

  static Future<List<dynamic>> getExercises(String token, {String? gymId}) async {
    final uri = Uri.parse('$baseUrl/exercises').replace(
      queryParameters: gymId != null ? {'gymId': gymId} : null,
    );

    final response = await http.get(
      uri,
      headers: {
        ...headers,
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to get exercises: ${response.body}');
    }
  }

  static Future<List<dynamic>> getPromotions(String token, {String? gymId}) async {
    final uri = Uri.parse('$baseUrl/promotions').replace(
      queryParameters: gymId != null ? {'gymId': gymId} : null,
    );

    final response = await http.get(
      uri,
      headers: {
        ...headers,
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to get promotions: ${response.body}');
    }
  }
}
