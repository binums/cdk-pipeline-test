"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkTsWorkshopStack = void 0;
const lambda = require("@aws-cdk/aws-lambda");
const cdk = require("@aws-cdk/core");
const apigateway = require("@aws-cdk/aws-apigateway");
const hitCounter_1 = require("./hitCounter");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
class CdkTsWorkshopStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const hello = new lambda.Function(this, "HelloHandler", {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset("lambda"),
            handler: "hello.handler"
        });
        const helloWithCounter = new hitCounter_1.HitCounter(this, "HelloHitCounter", {
            downstream: hello
        });
        new apigateway.LambdaRestApi(this, "Endpoint", {
            handler: helloWithCounter.handler
        });
        new cdk_dynamo_table_viewer_1.TableViewer(this, "ViewHitCounter", {
            title: "Hello Hits",
            table: helloWithCounter.table
        });
    }
}
exports.CdkTsWorkshopStack = CdkTsWorkshopStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXRzLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXRzLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUE4QztBQUM5QyxxQ0FBcUM7QUFDckMsc0RBQXNEO0FBQ3RELDZDQUEwQztBQUMxQyxxRUFBc0Q7QUFFdEQsTUFBYSxrQkFBbUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNoRCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ25FLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3ZELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsZUFBZTtTQUN4QixDQUFDLENBQUM7UUFFSCxNQUFNLGdCQUFnQixHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDaEUsVUFBVSxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDOUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLE9BQU87U0FDakMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxxQ0FBVyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUN2QyxLQUFLLEVBQUUsWUFBWTtZQUNuQixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsS0FBSztTQUM3QixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Q7QUF2QkQsZ0RBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJAYXdzLWNkay9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCAqIGFzIGFwaWdhdGV3YXkgZnJvbSBcIkBhd3MtY2RrL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgeyBIaXRDb3VudGVyIH0gZnJvbSBcIi4vaGl0Q291bnRlclwiO1xuaW1wb3J0IHsgVGFibGVWaWV3ZXIgfSBmcm9tIFwiY2RrLWR5bmFtby10YWJsZS12aWV3ZXJcIjtcblxuZXhwb3J0IGNsYXNzIENka1RzV29ya3Nob3BTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG5cdGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG5cdFx0c3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cblx0XHRjb25zdCBoZWxsbyA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJIZWxsb0hhbmRsZXJcIiwge1xuXHRcdFx0cnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG5cdFx0XHRjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCJsYW1iZGFcIiksXG5cdFx0XHRoYW5kbGVyOiBcImhlbGxvLmhhbmRsZXJcIlxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgaGVsbG9XaXRoQ291bnRlciA9IG5ldyBIaXRDb3VudGVyKHRoaXMsIFwiSGVsbG9IaXRDb3VudGVyXCIsIHtcblx0XHRcdGRvd25zdHJlYW06IGhlbGxvXG5cdFx0fSk7XG5cblx0XHRuZXcgYXBpZ2F0ZXdheS5MYW1iZGFSZXN0QXBpKHRoaXMsIFwiRW5kcG9pbnRcIiwge1xuXHRcdFx0aGFuZGxlcjogaGVsbG9XaXRoQ291bnRlci5oYW5kbGVyXG5cdFx0fSk7XG5cblx0XHRuZXcgVGFibGVWaWV3ZXIodGhpcywgXCJWaWV3SGl0Q291bnRlclwiLCB7XG5cdFx0XHR0aXRsZTogXCJIZWxsbyBIaXRzXCIsXG5cdFx0XHR0YWJsZTogaGVsbG9XaXRoQ291bnRlci50YWJsZVxuXHRcdH0pO1xuXHR9XG59XG4iXX0=