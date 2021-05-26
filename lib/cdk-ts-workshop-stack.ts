import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import { HitCounter } from "./hitCounter";
import { TableViewer } from "cdk-dynamo-table-viewer";

export class CdkTsWorkshopStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const hello = new lambda.Function(this, "HelloHandler", {
			runtime: lambda.Runtime.NODEJS_12_X,
			code: lambda.Code.fromAsset("lambda"),
			handler: "hello.handler"
		});

		const helloWithCounter = new HitCounter(this, "HelloHitCounter", {
			downstream: hello
		});

		new apigateway.LambdaRestApi(this, "Endpoint", {
			handler: helloWithCounter.handler
		});

		new TableViewer(this, "ViewHitCounter", {
			title: "Hello Hits",
			table: helloWithCounter.table
		});
	}
}
