import * as cdk from "@aws-cdk/core";

export interface WorkshopPipelineStackProps {}

export class WorkshopPipelineStack extends cdk.Construct {
	constructor(
		scope: cdk.Construct,
		id: string,
		props?: WorkshopPipelineStackProps
	) {
		super(scope, id);
	}
}
