import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:gym_app/providers/auth_provider.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  bool _isLoading = true;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _checkAuth());
  }

  Future<void> _checkAuth() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    try {
      setState(() {
        _isLoading = true;
        _errorMessage = null;
      });

      final isLoggedIn = await authProvider.tryAutoLogin();

      debugPrint('User login status: $isLoggedIn');

      if (!mounted) return;
      
      _navigateToNextScreen(isLoggedIn);
    } catch (e) {
      debugPrint('Auth Error: $e');

      if (!mounted) return;

      setState(() {
        _isLoading = false;
        _errorMessage = 'Failed to connect to server. Please check your internet connection and try again.';
      });

      Future.delayed(const Duration(seconds: 3), () {
        if (mounted) {
          _navigateToNextScreen(false);
        }
      });
    }
  }

  void _navigateToNextScreen(bool isLoggedIn) {
    final nextScreen = isLoggedIn ? '/home' : '/login';
    debugPrint('Navigating to: $nextScreen');
    Navigator.of(context).pushReplacementNamed(nextScreen);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.fitness_center,
                size: 80,
                color: Colors.blue,
              ),
              const SizedBox(height: 24),
              if (_isLoading) 
                const CircularProgressIndicator()
              else if (_errorMessage != null) ...[
                Text(
                  _errorMessage!,
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Colors.red, fontSize: 16),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _checkAuth,
                  child: const Text('Retry'),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
