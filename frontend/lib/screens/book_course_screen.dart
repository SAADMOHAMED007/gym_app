import 'package:flutter/material.dart';

class BookCourseScreen extends StatelessWidget {
  const BookCourseScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Book Course'),
      ),
      body: const Center(
        child: Text('Course Booking Screen'),
      ),
    );
  }
}
