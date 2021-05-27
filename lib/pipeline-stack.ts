import * as cdk from "@aws-cdk/core";
import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { SecretValue } from "@aws-cdk/core";
import { WorkshopPipelineStage } from "./pipeline-satge";

export class WorkshopPipelineStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id);

		const sourceArtifactDev = new codepipeline.Artifact();
		const cloudAssemblyArtifactDev = new codepipeline.Artifact();

		const pipelineDev = new CdkPipeline(this, "PipelineDev", {
			pipelineName: "WorkshopPipelineDev",
			cloudAssemblyArtifact: cloudAssemblyArtifactDev,

			sourceAction: new codepipeline_actions.GitHubSourceAction({
				actionName: "GitHub",
				output: sourceArtifactDev,
				oauthToken: SecretValue.secretsManager(
					"CDK-Pipeline-test-github-token"
				),
				branch: "dev",
				owner: "binums",
				repo: "cdk-pipeline-test"
			}),

			synthAction: SimpleSynthAction.standardNpmSynth({
				sourceArtifact: sourceArtifactDev,
				cloudAssemblyArtifact: cloudAssemblyArtifactDev,
				buildCommand: "npm run build",
				synthCommand: "npx cdk synth --context stageName=dev"
			})
		});

		const deployDev = new WorkshopPipelineStage(this, "DeployDev");

		pipelineDev.addApplicationStage(deployDev);

		const sourceArtifactProd = new codepipeline.Artifact();
		const cloudAssemblyArtifactProd = new codepipeline.Artifact();

		const pipelineProd = new CdkPipeline(this, "PipelineProd", {
			pipelineName: "WorkshopPipelineProd",
			cloudAssemblyArtifact: cloudAssemblyArtifactProd,

			sourceAction: new codepipeline_actions.GitHubSourceAction({
				actionName: "GitHub",
				output: sourceArtifactProd,
				oauthToken: SecretValue.secretsManager(
					"CDK-Pipeline-test-github-token"
				),
				branch: "main",
				owner: "binums",
				repo: "cdk-pipeline-test"
			}),

			synthAction: SimpleSynthAction.standardNpmSynth({
				sourceArtifact: sourceArtifactProd,
				cloudAssemblyArtifact: cloudAssemblyArtifactProd,
				buildCommand: "npm run build",
				synthCommand: "npx cdk synth --context stageName=prod"
			})
		});

		const deployProd = new WorkshopPipelineStage(this, "DeployProd");

		pipelineProd.addApplicationStage(deployProd);
	}
}
