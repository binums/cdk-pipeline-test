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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXRzLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXRzLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUE4QztBQUM5QyxxQ0FBcUM7QUFDckMsc0RBQXNEO0FBQ3RELDZDQUEwQztBQUMxQyxxRUFBc0Q7QUFFdEQsTUFBYSxrQkFBbUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNoRCxZQUFZLEtBQWMsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDN0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDdkQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxlQUFlO1NBQ3hCLENBQUMsQ0FBQztRQUVILE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSx1QkFBVSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUNoRSxVQUFVLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztTQUNqQyxDQUFDLENBQUM7UUFFSCxJQUFJLHFDQUFXLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3ZDLEtBQUssRUFBRSxZQUFZO1lBQ25CLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLO1NBQzdCLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQXZCRCxnREF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIGNkayBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0ICogYXMgYXBpZ2F0ZXdheSBmcm9tIFwiQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IEhpdENvdW50ZXIgfSBmcm9tIFwiLi9oaXRDb3VudGVyXCI7XG5pbXBvcnQgeyBUYWJsZVZpZXdlciB9IGZyb20gXCJjZGstZHluYW1vLXRhYmxlLXZpZXdlclwiO1xuXG5leHBvcnQgY2xhc3MgQ2RrVHNXb3Jrc2hvcFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcblx0Y29uc3RydWN0b3Ioc2NvcGU6IGNkay5BcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcblx0XHRzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuXHRcdGNvbnN0IGhlbGxvID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIkhlbGxvSGFuZGxlclwiLCB7XG5cdFx0XHRydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcblx0XHRcdGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcImxhbWJkYVwiKSxcblx0XHRcdGhhbmRsZXI6IFwiaGVsbG8uaGFuZGxlclwiXG5cdFx0fSk7XG5cblx0XHRjb25zdCBoZWxsb1dpdGhDb3VudGVyID0gbmV3IEhpdENvdW50ZXIodGhpcywgXCJIZWxsb0hpdENvdW50ZXJcIiwge1xuXHRcdFx0ZG93bnN0cmVhbTogaGVsbG9cblx0XHR9KTtcblxuXHRcdG5ldyBhcGlnYXRld2F5LkxhbWJkYVJlc3RBcGkodGhpcywgXCJFbmRwb2ludFwiLCB7XG5cdFx0XHRoYW5kbGVyOiBoZWxsb1dpdGhDb3VudGVyLmhhbmRsZXJcblx0XHR9KTtcblxuXHRcdG5ldyBUYWJsZVZpZXdlcih0aGlzLCBcIlZpZXdIaXRDb3VudGVyXCIsIHtcblx0XHRcdHRpdGxlOiBcIkhlbGxvIEhpdHNcIixcblx0XHRcdHRhYmxlOiBoZWxsb1dpdGhDb3VudGVyLnRhYmxlXG5cdFx0fSk7XG5cdH1cbn1cbiJdfQ==