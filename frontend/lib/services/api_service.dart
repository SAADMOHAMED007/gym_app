import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class ApiService {
  // Get the appropriate base URL based on the platform and environment
  static String getBaseUrl() {
    // For Android emulator, use 10.0.2.2 instead of localhost
    if (Platform.isAndroid && !kIsWeb) {
      return 'http://10.0.2.2:3000';
    }
    // For iOS simulator, use localhost
    else if (Platform.isIOS && !kIsWeb) {
      return 'http://localhost:3000';
    }
    // For web or desktop, use localhost
    else {
      return 'http://localhost:3000';
    }
  }

  static const headers = {'Content-Type': 'application/json'};

  // Authentication endpoints
  static Future<Map<String, dynamic>> login(String email, String password) async {
    final baseUrl = getBaseUrl();
    try {
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
    } catch (e) {
      print('Login error: $e');
      throw Exception('Failed to connect to server. Please check your internet connection and try again.');
    }
  }

  static Future<Map<String, dynamic>> register(Map<String, dynamic> userData) async {
    final baseUrl = getBaseUrl();
    try {
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
    } catch (e) {
      print('Register error: $e');
      throw Exception('Failed to connect to server. Please check your internet connection and try again.');
    }
  }

  static Future<Map<String, dynamic>> getProfile(String token) async {
    final baseUrl = getBaseUrl();
    try {
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
    } catch (e) {
      print('Get profile error: $e');
      throw Exception('Failed to connect to server. Please check your internet connection and try again.');
    }
  }

  // Workout endpoints
  static Future<List<dynamic>> getWorkouts(String token, String userId) async {
    final baseUrl = getBaseUrl();
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/workouts?userId=$userId'),
        headers: {
          ...headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['data'] ?? [];
      } else {
        throw Exception('Failed to get workouts: ${response.body}');
      }
    } catch (e) {
      print('Get workouts error: $e');
      throw Exception('Failed to connect to server. Please check your internet connection and try again.');
    }
  }

  static Future<Map<String, dynamic>> createWorkout(String token, Map<String, dynamic> workoutData) async {
    final baseUrl = getBaseUrl();
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/workouts'),
        headers: {
          ...headers,
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(workoutData),
      );

      if (response.statusCode == 201) {
        final data = jsonDecode(response.body);
        return data['data'];
      } else {
        throw Exception('Failed to create workout: ${response.body}');
      }
    } catch (e) {
      print('Create workout error: $e');
      throw Exception('Failed to connect to server. Please check your internet connection and try again.');
    }
  }

  static Future<Map<String, dynamic>> updateWorkout(String token, String workoutId, Map<String, dynamic> workoutData) async {
    final baseUrl = getBaseUrl();
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/workouts/$workoutId'),
        headers: {
          ...headers,
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(workoutData),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['data'];
      } else {
        throw Exception('Failed to update workout: ${response.body}');
      }
    } catch (e) {
      print('Update workout error: $e');
      throw Exception('Failed to connect to server. Please check your internet connection and try again.');
    }
  }

  static Future<void> deleteWorkout(String token, String workoutId) async {
    final baseUrl = getBaseUrl();
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/workouts/$workoutId'),
        headers: {
          ...headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode != 200 && response.statusCode != 204) {
        throw Exception('Failed to delete workout: ${response.body}');
      }
    } catch (e) {
      print('Delete workout error: $e');
      throw Exception('Failed to connect to server. Please check your internet connection and try again.');
    }
  }

  // Exercise endpoints
  static Future<List<dynamic>> getExercises(String token, {String? gymId}) async {
    final baseUrl = getBaseUrl();
    final uri = Uri.parse('$baseUrl/exercises').replace(
      queryParameters: gymId != null ? {'gymId': gymId} : null,
    );

    try {
      final response = await http.get(
        uri,
        headers: {
          ...headers,
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['data'] ?? [];
      } else {
        throw Exception('Failed to get exercises: ${response.body}');
      }
    } catch (e) {
      print('Get exercises error: $e');
      throw Exception('Failed to connect to server. Please check your internet connection and try again.');
    }
  }

  static Future<List<dynamic>> getPromotions(String token, {String? gymId}) async {
    final baseUrl = getBaseUrl();
    final uri = Uri.parse('$baseUrl/promotions').replace(
      queryParameters: gymId != null ? {'gymId': gymId} : null,
    );

    try {
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
    } catch (e) {
      print('Get promotions error: $e');
      throw Exception('Failed to connect to server. Please check your internet connection and try again.');
    }
  }
}

