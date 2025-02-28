import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:gym_app/models/user.dart';
import 'package:gym_app/services/api_service.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  String? _token;
  bool _isLoading = false;

  User? get user => _user;
  String? get token => _token;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _token != null;

  Future<void> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await ApiService.login(email, password);
      if (response['data'] != null) {
        _token = response['data']['access_token'];
        _user = User.fromJson(response['data']['user']);
        await _saveAuthData();
      } else {
        throw Exception('Invalid response format');
      }
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      rethrow;
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<void> register(Map<String, dynamic> userData) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await ApiService.register(userData);
      if (response['data'] != null) {
        _token = response['data']['access_token'];
        _user = User.fromJson(response['data']['user']);
        await _saveAuthData();
      } else {
        throw Exception('Invalid response format');
      }
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      rethrow;
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<void> logout() async {
    _user = null;
    _token = null;
    await _clearAuthData();
    notifyListeners();
  }

  Future<void> _saveAuthData() async {
    final prefs = await SharedPreferences.getInstance();
    if (_token != null) {
      await prefs.setString('token', _token!);
    }
    if (_user != null) {
      await prefs.setString('user', jsonEncode(_user!.toJson()));
    }
  }

  Future<void> _clearAuthData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('user');
  }

  Future<bool> tryAutoLogin() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      if (!prefs.containsKey('token')) {
        return false;
      }
      
      _token = prefs.getString('token');
      final userStr = prefs.getString('user');
      
      if (userStr != null) {
        try {
          final userData = jsonDecode(userStr);
          _user = User.fromJson(userData);
          
          // Verify token is still valid
          final response = await ApiService.getProfile(_token!);
          if (response['data'] != null) {
            _user = User.fromJson(response['data']);
            await _saveAuthData();
            notifyListeners();
            return true;
          }
        } catch (e) {
          await _clearAuthData();
          return false;
        }
      }
      
      return false;
    } catch (e) {
      return false;
    }
  }
}
