FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml /app
RUN mvn dependency:go-offline

COPY . /app

RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

ARG CONTAINER_PORT=8080

COPY --from=build /app/target/*.jar app.jar

EXPOSE ${CONTAINER_PORT}

ENTRYPOINT ["java", "-jar", "app.jar"]
