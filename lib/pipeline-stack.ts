import * as cdk from "@aws-cdk/core";
import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { SecretValue } from "@aws-cdk/core";

export interface WorkshopPipelineStackProps {}

export class WorkshopPipelineStack extends cdk.Construct {
	constructor(
		scope: cdk.Construct,
		id: string,
		props?: WorkshopPipelineStackProps
	) {
		super(scope, id);

		const sourceArtifact = new codepipeline.Artifact();
		const cloudAssemblyArtifact = new codepipeline.Artifact();

		new CdkPipeline(this, "Pipeline", {
			pipelineName: "WorkshopPipeline",
			cloudAssemblyArtifact,

			sourceAction: new codepipeline_actions.GitHubSourceAction({
				actionName: "GitHub",
				output: sourceArtifact,
				oauthToken: SecretValue.secretsManager(
					"CDK-Pipeline-test-github-token"
				),
				branch: "main",
				owner: "binums",
				repo: "cdk-pipeline-test"
			}),

      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: "npm run build"
      })
		});
	}
}
