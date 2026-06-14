# Stage 1: Build the application
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy only the pom.xml first to leverage Docker cache for dependencies
COPY pom.xml ./pom.xml
RUN mvn dependency:go-offline -B

# Copy the rest of the application code
COPY src ./src

# Package the application, skipping tests
RUN mvn clean package -DskipTests

# Stage 2: Create the final runtime image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built JAR file from the build stage
# Assumes the JAR is named like 'clinic-api-0.0.1-SNAPSHOT.jar'.
# You might need to adjust 'clinic-api-0.0.1-SNAPSHOT.jar' if your JAR has a different name.
COPY --from=build /app/target/clinic_api-0.0.1-SNAPSHOT.jar  app.jar

# Expose the application port (default for Spring Boot)
EXPOSE 8080

# Set the command to run the application
# Using --spring.profiles.active=docker as in the original Dockerfile
CMD ["java", "-jar", "app.jar", "--spring.profiles.active=docker"]
