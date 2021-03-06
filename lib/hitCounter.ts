import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export interface HitCounterProps {
	downstream: lambda.IFunction;
}

export class HitCounter extends cdk.Construct {
	public readonly handler: lambda.Function;

	public readonly table: dynamodb.Table;

	constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
		super(scope, id);

		const stageName = this.node.tryGetContext("stageName") || "dev";

		const table = new dynamodb.Table(this, `Hits-${stageName}`, {
			tableName: `Hits-${stageName}`,
			partitionKey: {
				name: "path",
				type: dynamodb.AttributeType.STRING
			}
		});

		this.table = table;

		this.handler = new lambda.Function(this, `HitCounterHandler-${stageName}`, {
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
