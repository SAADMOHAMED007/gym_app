import 'package:flutter/material.dart';

class FindCoachScreen extends StatelessWidget {
  const FindCoachScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Find Coach'),
      ),
      body: const Center(
        child: Text('Coach List Screen'),
      ),
    );
  }
}
