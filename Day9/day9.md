# Day 9 – NutriScope: AI Nutrition Analytics Application

## Objective

The goal of this project was to learn iterative AI application development using Claude Artifacts. Instead of building a large application in a single prompt, the project followed a professional workflow:

1. Build a working MVP (Minimum Viable Product)
2. Test the MVP
3. Enhance the application with additional features
4. Compare both versions and document learnings

---

# Project Overview

NutriScope is an AI-powered nutrition analytics application that helps users track food intake, monitor nutrient consumption, identify deficiencies, and receive personalized recommendations.

The application was developed entirely as a single-file HTML application using Claude.

---

# MVP Version

## Features Implemented

### User Profile

* Age
* Gender
* Height
* Weight
* Activity Level
* Dietary Preference

### Food Logging

* Add Food
* Quantity Tracking
* Unit Selection
* Editable Entries
* Remove Entries

### Food Database

Included 20 common foods:

* Rice
* Roti
* Dal
* Paneer
* Curd
* Chana
* Rajma
* Banana
* Apple
* Milk
* Oats
* Bread
* Egg
* Chicken
* Fish
* Potato
* Poha
* Idli
* Dosa
* Spinach

### Nutrient Tracking

Tracked:

* Calories
* Protein
* Carbohydrates
* Fat
* Fiber
* Iron
* Calcium
* Vitamin C
* Vitamin D
* Vitamin B12

### Dashboard Analytics

* Energy Progress
* Macro Distribution
* Top Deficiencies
* Top Excesses
* Nutrient Summary Table

### Recommendations

* Food Additions
* Food Swaps
* Portion Adjustments
* Dietary Preference-Based Suggestions

### Design

* Premium SaaS UI
* Mobile Responsive
* Dark Theme
* Interactive Charts
* Modern Card Layout
* Single HTML File

---

# MVP Screenshots

## Dashboard

![Dashboard](screenshots/mvp-dashboard.png)

## Profile Page

![Profile](screenshots/mvp-profile.png)

## Food Log

![Food Log](screenshots/mvp-foodlog.png)

## Nutrient Analysis

![Nutrients](screenshots/mvp-nutrients.png)

## Recommendations

![Recommendations](screenshots/mvp-recommendations.png)

---

# Enhanced Version

## Features Added

### Data Management

* CSV Upload Support
* Expanded Food Database
* Improved Nutrient Tracking

### Additional Nutrition Analytics

* Additional Micronutrients
* Better Nutrient Breakdown
* Improved Progress Tracking

### Meal Planning

* 2-Day Meal Planner
* Balanced Meal Suggestions
* Dietary Preference Support

### Risk Analysis

* Nutrient Deficiency Risk Detection
* Health Risk Indicators
* Personalized Nutrition Alerts

### Advanced Recommendations

* Smarter Food Suggestions
* Nutrient Optimization Tips
* Goal-Based Recommendations

### Better Visualization

* Enhanced Charts
* Improved Dashboard Components
* Better Data Representation

### Information & References

* Educational Disclaimer
* Nutrition Sources
* Additional Guidance

---

# Enhanced Version Screenshots

## Dashboard

![Enhanced Dashboard](screenshots/enhanced-dashboard.png)

## My Profile

![Enhanced Profile](screenshots/enhanced-profile.png)

## Food Log & CSV Upload

![Enhanced Food Log](screenshots/enhanced-foodlog-csv.png)

## Nutrients

![Enhanced Nutrients](screenshots/enhanced-nutrients.png)

## Recommendations

![Enhanced Recommendations](screenshots/enhanced-recommendations.png)

## Meal Planner

![Meal Planner](screenshots/enhanced-mealplanner.png)

## Risk Analysis

![Risk Analysis](screenshots/enhanced-risk-analysis.png)

## Info & Sources

![Info & Sources](screenshots/enhanced-info-sources.png)

---

# MVP vs Enhanced Version

| Feature                   | MVP Version | Enhanced Version      |
| ------------------------- | ----------- | --------------------- |
| Food Database             | 20 Foods    | 60+ Foods             |
| CSV Upload                | ❌           | ✅                     |
| Meal Planner              | ❌           | ✅                     |
| Risk Analysis             | ❌           | ✅                     |
| Additional Micronutrients | ❌           | ✅                     |
| Educational Disclaimer    | ❌           | ✅                     |
| Nutrition Sources         | ❌           | ✅                     |
| Charts                    | Basic       | Advanced              |
| Recommendations           | Basic       | Advanced              |
| Analytics                 | Standard    | Enhanced              |
| Food Log                  | Basic       | Enhanced + CSV Upload |
| Nutrient Analysis         | Standard    | Expanded              |
| Info & Sources            | ❌           | ✅                     |

---

# Files Included

## HTML Files

* nutriscope-mvp.html
* nutriscope-enhanced.html

## Screenshots Folder Structure

### MVP

* screenshots/mvp-dashboard.png
* screenshots/mvp-profile.png
* screenshots/mvp-foodlog.png
* screenshots/mvp-nutrients.png
* screenshots/mvp-recommendations.png

### Enhanced

* screenshots/enhanced-dashboard.png
* screenshots/enhanced-profile.png
* screenshots/enhanced-foodlog-csv.png
* screenshots/enhanced-nutrients.png
* screenshots/enhanced-recommendations.png
* screenshots/enhanced-mealplanner.png
* screenshots/enhanced-risk-analysis.png
* screenshots/enhanced-info-sources.png

---

# Key Learnings

### 1. MVP First Approach Works Better

Building a smaller working application first was significantly more reliable than trying to create a large application in a single prompt.

### 2. Iterative Development Improves Quality

Enhancing an existing application produced better results than repeatedly generating an application from scratch.

### 3. Claude Artifacts Can Build Real Applications

Claude was able to generate a functional nutrition analytics application with dashboards, forms, calculations, charts, and recommendations.

### 4. Better Prompts Lead to Better Outputs

Providing structured requirements and enhancement requests produced higher-quality applications.

### 5. AI Accelerates Prototyping

Complex applications can be built much faster using AI-assisted development workflows.

---

# Comparison Notes

The MVP version focused on core nutrition tracking functionality including food logging, nutrient calculations, dashboards, and recommendations.

The enhanced version expanded the application with additional foods, CSV support, meal planning, risk analysis, improved charts, advanced recommendations, educational resources, and a more comprehensive nutrition analytics experience.

The enhancement process demonstrated how iterative AI development can transform a functional MVP into a significantly more capable application.

---

# Conclusion

This project demonstrated the value of iterative AI application development. Starting with a working MVP and progressively enhancing functionality resulted in a more robust, feature-rich, and user-friendly nutrition analytics application.

The experience highlighted how Claude Artifacts can be used as a practical tool for building interactive applications, validating ideas, and accelerating product development workflows.

#60DayClaudeChallenge

