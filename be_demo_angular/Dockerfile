# Stage 1: Build
FROM gradle:8.5-jdk17-alpine AS build
WORKDIR /app

COPY . .
RUN gradle bootJar -x test --no-daemon

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# The bootJar creates the final jar. We copy it to app.jar
COPY --from=build /app/build/libs/be_demo_angular-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]