FROM openjdk:19-jdk-alpine
ADD ./target/*.jar app.jar

EXPOSE 8083
ENTRYPOINT ["java","-jar","app.jar"]
