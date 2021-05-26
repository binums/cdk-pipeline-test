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
        const stageName = this.node.tryGetContext("stageName") || "dev";
        const hello = new lambda.Function(this, `HelloHandler-${stageName}`, {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset("lambda"),
            handler: "hello.handler"
        });
        const helloWithCounter = new hitCounter_1.HitCounter(this, `HelloHitCounter-${stageName}`, {
            downstream: hello
        });
        const gateway = new apigateway.LambdaRestApi(this, `Endpoint-${stageName}`, {
            handler: helloWithCounter.handler
        });
        const tv = new cdk_dynamo_table_viewer_1.TableViewer(this, `ViewHitCounter-${stageName}`, {
            title: "Hello Hits",
            table: helloWithCounter.table
        });
        this.hcEndpoint = new core_1.CfnOutput(this, `GatewayUrl-${stageName}`, {
            value: gateway.url
        });
        this.hcEndpoint = new core_1.CfnOutput(this, `TableViewerUrl-${stageName}`, {
            value: tv.endpoint
        });
    }
}
exports.CdkTsWorkshopStack = CdkTsWorkshopStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXRzLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXRzLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUE4QztBQUM5QyxxQ0FBcUM7QUFDckMsc0RBQXNEO0FBQ3RELDZDQUEwQztBQUMxQyxxRUFBc0Q7QUFDdEQsd0NBQTBDO0FBRTFDLE1BQWEsa0JBQW1CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFJaEQsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLENBQUM7UUFFaEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsU0FBUyxFQUFFLEVBQUU7WUFDcEUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxlQUFlO1NBQ3hCLENBQUMsQ0FBQztRQUVILE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSx1QkFBVSxDQUN0QyxJQUFJLEVBQ0osbUJBQW1CLFNBQVMsRUFBRSxFQUM5QjtZQUNDLFVBQVUsRUFBRSxLQUFLO1NBQ2pCLENBQ0QsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FDM0MsSUFBSSxFQUNKLFlBQVksU0FBUyxFQUFFLEVBQ3ZCO1lBQ0MsT0FBTyxFQUFFLGdCQUFnQixDQUFDLE9BQU87U0FDakMsQ0FDRCxDQUFDO1FBRUYsTUFBTSxFQUFFLEdBQUcsSUFBSSxxQ0FBVyxDQUFDLElBQUksRUFBRSxrQkFBa0IsU0FBUyxFQUFFLEVBQUU7WUFDL0QsS0FBSyxFQUFFLFlBQVk7WUFDbkIsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEtBQUs7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGdCQUFTLENBQUMsSUFBSSxFQUFFLGNBQWMsU0FBUyxFQUFFLEVBQUU7WUFDaEUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1NBQ2xCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxnQkFBUyxDQUFDLElBQUksRUFBRSxrQkFBa0IsU0FBUyxFQUFFLEVBQUU7WUFDcEUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRO1NBQ2xCLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQTVDRCxnREE0Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIGNkayBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0ICogYXMgYXBpZ2F0ZXdheSBmcm9tIFwiQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCB7IEhpdENvdW50ZXIgfSBmcm9tIFwiLi9oaXRDb3VudGVyXCI7XG5pbXBvcnQgeyBUYWJsZVZpZXdlciB9IGZyb20gXCJjZGstZHluYW1vLXRhYmxlLXZpZXdlclwiO1xuaW1wb3J0IHsgQ2ZuT3V0cHV0IH0gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcblxuZXhwb3J0IGNsYXNzIENka1RzV29ya3Nob3BTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG5cdHB1YmxpYyByZWFkb25seSBoY1ZpZXdlclVybDogY2RrLkNmbk91dHB1dDtcblx0cHVibGljIHJlYWRvbmx5IGhjRW5kcG9pbnQ6IGNkay5DZm5PdXRwdXQ7XG5cblx0Y29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcblx0XHRzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuXHRcdGNvbnN0IHN0YWdlTmFtZSA9IHRoaXMubm9kZS50cnlHZXRDb250ZXh0KFwic3RhZ2VOYW1lXCIpIHx8IFwiZGV2XCI7XG5cblx0XHRjb25zdCBoZWxsbyA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgYEhlbGxvSGFuZGxlci0ke3N0YWdlTmFtZX1gLCB7XG5cdFx0XHRydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcblx0XHRcdGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcImxhbWJkYVwiKSxcblx0XHRcdGhhbmRsZXI6IFwiaGVsbG8uaGFuZGxlclwiXG5cdFx0fSk7XG5cblx0XHRjb25zdCBoZWxsb1dpdGhDb3VudGVyID0gbmV3IEhpdENvdW50ZXIoXG5cdFx0XHR0aGlzLFxuXHRcdFx0YEhlbGxvSGl0Q291bnRlci0ke3N0YWdlTmFtZX1gLFxuXHRcdFx0e1xuXHRcdFx0XHRkb3duc3RyZWFtOiBoZWxsb1xuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHRjb25zdCBnYXRld2F5ID0gbmV3IGFwaWdhdGV3YXkuTGFtYmRhUmVzdEFwaShcblx0XHRcdHRoaXMsXG5cdFx0XHRgRW5kcG9pbnQtJHtzdGFnZU5hbWV9YCxcblx0XHRcdHtcblx0XHRcdFx0aGFuZGxlcjogaGVsbG9XaXRoQ291bnRlci5oYW5kbGVyXG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdGNvbnN0IHR2ID0gbmV3IFRhYmxlVmlld2VyKHRoaXMsIGBWaWV3SGl0Q291bnRlci0ke3N0YWdlTmFtZX1gLCB7XG5cdFx0XHR0aXRsZTogXCJIZWxsbyBIaXRzXCIsXG5cdFx0XHR0YWJsZTogaGVsbG9XaXRoQ291bnRlci50YWJsZVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5oY0VuZHBvaW50ID0gbmV3IENmbk91dHB1dCh0aGlzLCBgR2F0ZXdheVVybC0ke3N0YWdlTmFtZX1gLCB7XG5cdFx0XHR2YWx1ZTogZ2F0ZXdheS51cmxcblx0XHR9KTtcblxuXHRcdHRoaXMuaGNFbmRwb2ludCA9IG5ldyBDZm5PdXRwdXQodGhpcywgYFRhYmxlVmlld2VyVXJsLSR7c3RhZ2VOYW1lfWAsIHtcblx0XHRcdHZhbHVlOiB0di5lbmRwb2ludFxuXHRcdH0pO1xuXHR9XG59XG4iXX0=