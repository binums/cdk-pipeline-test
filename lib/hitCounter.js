"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitCounter = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const dynamodb = require("@aws-cdk/aws-dynamodb");
class HitCounter extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const table = new dynamodb.Table(this, "Hits", {
            tableName: "Hits",
            partitionKey: {
                name: "path",
                type: dynamodb.AttributeType.STRING
            }
        });
        this.table = table;
        this.handler = new lambda.Function(this, "HitCounterHandler", {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset("lambda"),
            handler: "hitCounter.handler",
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        });
        table.grantReadWriteData(this.handler);
        props.downstream.grantInvoke(this.handler);
    }
}
exports.HitCounter = HitCounter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Q291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpdENvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUE4QztBQUM5QyxrREFBa0Q7QUFNbEQsTUFBYSxVQUFXLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFLNUMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQzlDLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLFlBQVksRUFBRTtnQkFDYixJQUFJLEVBQUUsTUFBTTtnQkFDWixJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQ25DO1NBQ0QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQzdELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLFdBQVcsRUFBRTtnQkFDWix3QkFBd0IsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVk7Z0JBQ3ZELGVBQWUsRUFBRSxLQUFLLENBQUMsU0FBUzthQUNoQztTQUNELENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdkMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRDtBQWhDRCxnQ0FnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSBcIkBhd3MtY2RrL2F3cy1keW5hbW9kYlwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhpdENvdW50ZXJQcm9wcyB7XG5cdGRvd25zdHJlYW06IGxhbWJkYS5JRnVuY3Rpb247XG59XG5cbmV4cG9ydCBjbGFzcyBIaXRDb3VudGVyIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XG5cdHB1YmxpYyByZWFkb25seSBoYW5kbGVyOiBsYW1iZGEuRnVuY3Rpb247XG5cblx0cHVibGljIHJlYWRvbmx5IHRhYmxlOiBkeW5hbW9kYi5UYWJsZTtcblxuXHRjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEhpdENvdW50ZXJQcm9wcykge1xuXHRcdHN1cGVyKHNjb3BlLCBpZCk7XG5cblx0XHRjb25zdCB0YWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCBcIkhpdHNcIiwge1xuXHRcdFx0dGFibGVOYW1lOiBcIkhpdHNcIixcblx0XHRcdHBhcnRpdGlvbktleToge1xuXHRcdFx0XHRuYW1lOiBcInBhdGhcIixcblx0XHRcdFx0dHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMudGFibGUgPSB0YWJsZTtcblxuXHRcdHRoaXMuaGFuZGxlciA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJIaXRDb3VudGVySGFuZGxlclwiLCB7XG5cdFx0XHRydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcblx0XHRcdGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcImxhbWJkYVwiKSxcblx0XHRcdGhhbmRsZXI6IFwiaGl0Q291bnRlci5oYW5kbGVyXCIsXG5cdFx0XHRlbnZpcm9ubWVudDoge1xuXHRcdFx0XHRET1dOU1RSRUFNX0ZVTkNUSU9OX05BTUU6IHByb3BzLmRvd25zdHJlYW0uZnVuY3Rpb25OYW1lLFxuXHRcdFx0XHRISVRTX1RBQkxFX05BTUU6IHRhYmxlLnRhYmxlTmFtZVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHRoaXMuaGFuZGxlcik7XG5cblx0XHRwcm9wcy5kb3duc3RyZWFtLmdyYW50SW52b2tlKHRoaXMuaGFuZGxlcik7XG5cdH1cbn1cbiJdfQ==