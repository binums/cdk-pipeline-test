"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkTsWorkshopStack = void 0;
const lambda = require("@aws-cdk/aws-lambda");
const cdk = require("@aws-cdk/core");
const apigateway = require("@aws-cdk/aws-apigateway");
const hitCounter_1 = require("./hitCounter");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
const core_1 = require("@aws-cdk/core");
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
        const gateway = new apigateway.LambdaRestApi(this, "Endpoint", {
            handler: helloWithCounter.handler
        });
        const tv = new cdk_dynamo_table_viewer_1.TableViewer(this, "ViewHitCounter", {
            title: "Hello Hits",
            table: helloWithCounter.table
        });
        this.hcEndpoint = new core_1.CfnOutput(this, "GatewayUrl", {
            value: gateway.url
        });
        this.hcEndpoint = new core_1.CfnOutput(this, "TableViewerUrl", {
            value: tv.endpoint
        });
    }
}
exports.CdkTsWorkshopStack = CdkTsWorkshopStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXRzLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXRzLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUE4QztBQUM5QyxxQ0FBcUM7QUFDckMsc0RBQXNEO0FBQ3RELDZDQUEwQztBQUMxQyxxRUFBc0Q7QUFDdEQsd0NBQTBDO0FBRTFDLE1BQWEsa0JBQW1CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFJaEQsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN2RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLGVBQWU7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ2hFLFVBQVUsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQzlELE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPO1NBQ2pDLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxHQUFHLElBQUkscUNBQVcsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDbEQsS0FBSyxFQUFFLFlBQVk7WUFDbkIsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEtBQUs7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGdCQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNuRCxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUc7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGdCQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3ZELEtBQUssRUFBRSxFQUFFLENBQUMsUUFBUTtTQUNsQixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Q7QUFsQ0QsZ0RBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJAYXdzLWNkay9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCAqIGFzIGFwaWdhdGV3YXkgZnJvbSBcIkBhd3MtY2RrL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgeyBIaXRDb3VudGVyIH0gZnJvbSBcIi4vaGl0Q291bnRlclwiO1xuaW1wb3J0IHsgVGFibGVWaWV3ZXIgfSBmcm9tIFwiY2RrLWR5bmFtby10YWJsZS12aWV3ZXJcIjtcbmltcG9ydCB7IENmbk91dHB1dCB9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5cbmV4cG9ydCBjbGFzcyBDZGtUc1dvcmtzaG9wU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuXHRwdWJsaWMgcmVhZG9ubHkgaGNWaWV3ZXJVcmw6IGNkay5DZm5PdXRwdXQ7XG5cdHB1YmxpYyByZWFkb25seSBoY0VuZHBvaW50OiBjZGsuQ2ZuT3V0cHV0O1xuXG5cdGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG5cdFx0c3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cblx0XHRjb25zdCBoZWxsbyA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJIZWxsb0hhbmRsZXJcIiwge1xuXHRcdFx0cnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG5cdFx0XHRjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCJsYW1iZGFcIiksXG5cdFx0XHRoYW5kbGVyOiBcImhlbGxvLmhhbmRsZXJcIlxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgaGVsbG9XaXRoQ291bnRlciA9IG5ldyBIaXRDb3VudGVyKHRoaXMsIFwiSGVsbG9IaXRDb3VudGVyXCIsIHtcblx0XHRcdGRvd25zdHJlYW06IGhlbGxvXG5cdFx0fSk7XG5cblx0XHRjb25zdCBnYXRld2F5ID0gbmV3IGFwaWdhdGV3YXkuTGFtYmRhUmVzdEFwaSh0aGlzLCBcIkVuZHBvaW50XCIsIHtcblx0XHRcdGhhbmRsZXI6IGhlbGxvV2l0aENvdW50ZXIuaGFuZGxlclxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgdHYgPSBuZXcgVGFibGVWaWV3ZXIodGhpcywgXCJWaWV3SGl0Q291bnRlclwiLCB7XG5cdFx0XHR0aXRsZTogXCJIZWxsbyBIaXRzXCIsXG5cdFx0XHR0YWJsZTogaGVsbG9XaXRoQ291bnRlci50YWJsZVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5oY0VuZHBvaW50ID0gbmV3IENmbk91dHB1dCh0aGlzLCBcIkdhdGV3YXlVcmxcIiwge1xuXHRcdFx0dmFsdWU6IGdhdGV3YXkudXJsXG5cdFx0fSk7XG5cblx0XHR0aGlzLmhjRW5kcG9pbnQgPSBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiVGFibGVWaWV3ZXJVcmxcIiwge1xuXHRcdFx0dmFsdWU6IHR2LmVuZHBvaW50XG5cdFx0fSk7XG5cdH1cbn1cbiJdfQ==