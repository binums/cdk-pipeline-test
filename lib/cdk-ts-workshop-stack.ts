import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import { HitCounter } from "./hitCounter";
import { TableViewer } from "cdk-dynamo-table-viewer";
import { CfnOutput } from "@aws-cdk/core";

export class CdkTsWorkshopStack extends cdk.Stack {
	public readonly hcViewerUrl: cdk.CfnOutput;
	public readonly hcEndpoint: cdk.CfnOutput;

	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const stageName = this.node.tryGetContext("stageName") || "dev";

		const hello = new lambda.Function(this, `HelloHandler-${stageName}`, {
			runtime: lambda.Runtime.NODEJS_12_X,
			code: lambda.Code.fromAsset("lambda"),
			handler: "hello.handler"
		});

		const helloWithCounter = new HitCounter(
			this,
			`HelloHitCounter-${stageName}`,
			{
				downstream: hello
			}
		);

		const gateway = new apigateway.LambdaRestApi(
			this,
			`Endpoint-${stageName}`,
			{
				handler: helloWithCounter.handler
			}
		);

		const tv = new TableViewer(this, `ViewHitCounter-${stageName}`, {
			title: "Hello Hits",
			table: helloWithCounter.table
		});

		this.hcEndpoint = new CfnOutput(this, `GatewayUrl-${stageName}`, {
			value: gateway.url
		});

		this.hcEndpoint = new CfnOutput(this, `TableViewerUrl-${stageName}`, {
			value: tv.endpoint
		});
	}
}
