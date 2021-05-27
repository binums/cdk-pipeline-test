"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopPipelineStack = void 0;
const cdk = require("@aws-cdk/core");
const codepipeline = require("@aws-cdk/aws-codepipeline");
const codepipeline_actions = require("@aws-cdk/aws-codepipeline-actions");
const pipelines_1 = require("@aws-cdk/pipelines");
const core_1 = require("@aws-cdk/core");
const pipeline_satge_1 = require("./pipeline-satge");
class WorkshopPipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id);
        const sourceArtifactDev = new codepipeline.Artifact();
        const cloudAssemblyArtifactDev = new codepipeline.Artifact();
        const pipelineDev = new pipelines_1.CdkPipeline(this, "PipelineDev", {
            pipelineName: "WorkshopPipelineDev",
            cloudAssemblyArtifact: cloudAssemblyArtifactDev,
            sourceAction: new codepipeline_actions.GitHubSourceAction({
                actionName: "GitHub",
                output: sourceArtifactDev,
                oauthToken: core_1.SecretValue.secretsManager("CDK-Pipeline-test-github-token"),
                branch: "dev",
                owner: "binums",
                repo: "cdk-pipeline-test"
            }),
            synthAction: pipelines_1.SimpleSynthAction.standardNpmSynth({
                sourceArtifact: sourceArtifactDev,
                cloudAssemblyArtifact: cloudAssemblyArtifactDev,
                buildCommand: "npm run build",
                synthCommand: "npx cdk synth --context stageName=dev"
            })
        });
        const deployDev = new pipeline_satge_1.WorkshopPipelineStage(this, "DeployDev");
        pipelineDev.addApplicationStage(deployDev);
        const sourceArtifactProd = new codepipeline.Artifact();
        const cloudAssemblyArtifactProd = new codepipeline.Artifact();
        const pipelineProd = new pipelines_1.CdkPipeline(this, "PipelineProd", {
            pipelineName: "WorkshopPipelineProd",
            cloudAssemblyArtifact: cloudAssemblyArtifactProd,
            sourceAction: new codepipeline_actions.GitHubSourceAction({
                actionName: "GitHub",
                output: sourceArtifactProd,
                oauthToken: core_1.SecretValue.secretsManager("CDK-Pipeline-test-github-token"),
                branch: "main",
                owner: "binums",
                repo: "cdk-pipeline-test"
            }),
            synthAction: pipelines_1.SimpleSynthAction.standardNpmSynth({
                sourceArtifact: sourceArtifactProd,
                cloudAssemblyArtifact: cloudAssemblyArtifactProd,
                buildCommand: "npm run build",
                synthCommand: "npx cdk synth --context stageName=prod"
            })
        });
        const deployProd = new pipeline_satge_1.WorkshopPipelineStage(this, "DeployProd");
        pipelineProd.addApplicationStage(deployProd);
    }
}
exports.WorkshopPipelineStack = WorkshopPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsMERBQTBEO0FBQzFELDBFQUEwRTtBQUMxRSxrREFBb0U7QUFDcEUsd0NBQTRDO0FBQzVDLHFEQUF5RDtBQUV6RCxNQUFhLHFCQUFzQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ25ELFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbkUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLGlCQUFpQixHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RELE1BQU0sd0JBQXdCLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFN0QsTUFBTSxXQUFXLEdBQUcsSUFBSSx1QkFBVyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDeEQsWUFBWSxFQUFFLHFCQUFxQjtZQUNuQyxxQkFBcUIsRUFBRSx3QkFBd0I7WUFFL0MsWUFBWSxFQUFFLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3pELFVBQVUsRUFBRSxRQUFRO2dCQUNwQixNQUFNLEVBQUUsaUJBQWlCO2dCQUN6QixVQUFVLEVBQUUsa0JBQVcsQ0FBQyxjQUFjLENBQ3JDLGdDQUFnQyxDQUNoQztnQkFDRCxNQUFNLEVBQUUsS0FBSztnQkFDYixLQUFLLEVBQUUsUUFBUTtnQkFDZixJQUFJLEVBQUUsbUJBQW1CO2FBQ3pCLENBQUM7WUFFRixXQUFXLEVBQUUsNkJBQWlCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQy9DLGNBQWMsRUFBRSxpQkFBaUI7Z0JBQ2pDLHFCQUFxQixFQUFFLHdCQUF3QjtnQkFDL0MsWUFBWSxFQUFFLGVBQWU7Z0JBQzdCLFlBQVksRUFBRSx1Q0FBdUM7YUFDckQsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sU0FBUyxHQUFHLElBQUksc0NBQXFCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRS9ELFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUzQyxNQUFNLGtCQUFrQixHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZELE1BQU0seUJBQXlCLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFOUQsTUFBTSxZQUFZLEdBQUcsSUFBSSx1QkFBVyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDMUQsWUFBWSxFQUFFLHNCQUFzQjtZQUNwQyxxQkFBcUIsRUFBRSx5QkFBeUI7WUFFaEQsWUFBWSxFQUFFLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3pELFVBQVUsRUFBRSxRQUFRO2dCQUNwQixNQUFNLEVBQUUsa0JBQWtCO2dCQUMxQixVQUFVLEVBQUUsa0JBQVcsQ0FBQyxjQUFjLENBQ3JDLGdDQUFnQyxDQUNoQztnQkFDRCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxLQUFLLEVBQUUsUUFBUTtnQkFDZixJQUFJLEVBQUUsbUJBQW1CO2FBQ3pCLENBQUM7WUFFRixXQUFXLEVBQUUsNkJBQWlCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQy9DLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLHFCQUFxQixFQUFFLHlCQUF5QjtnQkFDaEQsWUFBWSxFQUFFLGVBQWU7Z0JBQzdCLFlBQVksRUFBRSx3Q0FBd0M7YUFDdEQsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLElBQUksc0NBQXFCLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRWpFLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0Q7QUFoRUQsc0RBZ0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgKiBhcyBjb2RlcGlwZWxpbmUgZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmVcIjtcbmltcG9ydCAqIGFzIGNvZGVwaXBlbGluZV9hY3Rpb25zIGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lLWFjdGlvbnNcIjtcbmltcG9ydCB7IENka1BpcGVsaW5lLCBTaW1wbGVTeW50aEFjdGlvbiB9IGZyb20gXCJAYXdzLWNkay9waXBlbGluZXNcIjtcbmltcG9ydCB7IFNlY3JldFZhbHVlIH0gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7IFdvcmtzaG9wUGlwZWxpbmVTdGFnZSB9IGZyb20gXCIuL3BpcGVsaW5lLXNhdGdlXCI7XG5cbmV4cG9ydCBjbGFzcyBXb3Jrc2hvcFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuXHRjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuXHRcdHN1cGVyKHNjb3BlLCBpZCk7XG5cblx0XHRjb25zdCBzb3VyY2VBcnRpZmFjdERldiA9IG5ldyBjb2RlcGlwZWxpbmUuQXJ0aWZhY3QoKTtcblx0XHRjb25zdCBjbG91ZEFzc2VtYmx5QXJ0aWZhY3REZXYgPSBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0KCk7XG5cblx0XHRjb25zdCBwaXBlbGluZURldiA9IG5ldyBDZGtQaXBlbGluZSh0aGlzLCBcIlBpcGVsaW5lRGV2XCIsIHtcblx0XHRcdHBpcGVsaW5lTmFtZTogXCJXb3Jrc2hvcFBpcGVsaW5lRGV2XCIsXG5cdFx0XHRjbG91ZEFzc2VtYmx5QXJ0aWZhY3Q6IGNsb3VkQXNzZW1ibHlBcnRpZmFjdERldixcblxuXHRcdFx0c291cmNlQWN0aW9uOiBuZXcgY29kZXBpcGVsaW5lX2FjdGlvbnMuR2l0SHViU291cmNlQWN0aW9uKHtcblx0XHRcdFx0YWN0aW9uTmFtZTogXCJHaXRIdWJcIixcblx0XHRcdFx0b3V0cHV0OiBzb3VyY2VBcnRpZmFjdERldixcblx0XHRcdFx0b2F1dGhUb2tlbjogU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoXG5cdFx0XHRcdFx0XCJDREstUGlwZWxpbmUtdGVzdC1naXRodWItdG9rZW5cIlxuXHRcdFx0XHQpLFxuXHRcdFx0XHRicmFuY2g6IFwiZGV2XCIsXG5cdFx0XHRcdG93bmVyOiBcImJpbnVtc1wiLFxuXHRcdFx0XHRyZXBvOiBcImNkay1waXBlbGluZS10ZXN0XCJcblx0XHRcdH0pLFxuXG5cdFx0XHRzeW50aEFjdGlvbjogU2ltcGxlU3ludGhBY3Rpb24uc3RhbmRhcmROcG1TeW50aCh7XG5cdFx0XHRcdHNvdXJjZUFydGlmYWN0OiBzb3VyY2VBcnRpZmFjdERldixcblx0XHRcdFx0Y2xvdWRBc3NlbWJseUFydGlmYWN0OiBjbG91ZEFzc2VtYmx5QXJ0aWZhY3REZXYsXG5cdFx0XHRcdGJ1aWxkQ29tbWFuZDogXCJucG0gcnVuIGJ1aWxkXCIsXG5cdFx0XHRcdHN5bnRoQ29tbWFuZDogXCJucHggY2RrIHN5bnRoIC0tY29udGV4dCBzdGFnZU5hbWU9ZGV2XCJcblx0XHRcdH0pXG5cdFx0fSk7XG5cblx0XHRjb25zdCBkZXBsb3lEZXYgPSBuZXcgV29ya3Nob3BQaXBlbGluZVN0YWdlKHRoaXMsIFwiRGVwbG95RGV2XCIpO1xuXG5cdFx0cGlwZWxpbmVEZXYuYWRkQXBwbGljYXRpb25TdGFnZShkZXBsb3lEZXYpO1xuXG5cdFx0Y29uc3Qgc291cmNlQXJ0aWZhY3RQcm9kID0gbmV3IGNvZGVwaXBlbGluZS5BcnRpZmFjdCgpO1xuXHRcdGNvbnN0IGNsb3VkQXNzZW1ibHlBcnRpZmFjdFByb2QgPSBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0KCk7XG5cblx0XHRjb25zdCBwaXBlbGluZVByb2QgPSBuZXcgQ2RrUGlwZWxpbmUodGhpcywgXCJQaXBlbGluZVByb2RcIiwge1xuXHRcdFx0cGlwZWxpbmVOYW1lOiBcIldvcmtzaG9wUGlwZWxpbmVQcm9kXCIsXG5cdFx0XHRjbG91ZEFzc2VtYmx5QXJ0aWZhY3Q6IGNsb3VkQXNzZW1ibHlBcnRpZmFjdFByb2QsXG5cblx0XHRcdHNvdXJjZUFjdGlvbjogbmV3IGNvZGVwaXBlbGluZV9hY3Rpb25zLkdpdEh1YlNvdXJjZUFjdGlvbih7XG5cdFx0XHRcdGFjdGlvbk5hbWU6IFwiR2l0SHViXCIsXG5cdFx0XHRcdG91dHB1dDogc291cmNlQXJ0aWZhY3RQcm9kLFxuXHRcdFx0XHRvYXV0aFRva2VuOiBTZWNyZXRWYWx1ZS5zZWNyZXRzTWFuYWdlcihcblx0XHRcdFx0XHRcIkNESy1QaXBlbGluZS10ZXN0LWdpdGh1Yi10b2tlblwiXG5cdFx0XHRcdCksXG5cdFx0XHRcdGJyYW5jaDogXCJtYWluXCIsXG5cdFx0XHRcdG93bmVyOiBcImJpbnVtc1wiLFxuXHRcdFx0XHRyZXBvOiBcImNkay1waXBlbGluZS10ZXN0XCJcblx0XHRcdH0pLFxuXG5cdFx0XHRzeW50aEFjdGlvbjogU2ltcGxlU3ludGhBY3Rpb24uc3RhbmRhcmROcG1TeW50aCh7XG5cdFx0XHRcdHNvdXJjZUFydGlmYWN0OiBzb3VyY2VBcnRpZmFjdFByb2QsXG5cdFx0XHRcdGNsb3VkQXNzZW1ibHlBcnRpZmFjdDogY2xvdWRBc3NlbWJseUFydGlmYWN0UHJvZCxcblx0XHRcdFx0YnVpbGRDb21tYW5kOiBcIm5wbSBydW4gYnVpbGRcIixcblx0XHRcdFx0c3ludGhDb21tYW5kOiBcIm5weCBjZGsgc3ludGggLS1jb250ZXh0IHN0YWdlTmFtZT1wcm9kXCJcblx0XHRcdH0pXG5cdFx0fSk7XG5cblx0XHRjb25zdCBkZXBsb3lQcm9kID0gbmV3IFdvcmtzaG9wUGlwZWxpbmVTdGFnZSh0aGlzLCBcIkRlcGxveVByb2RcIik7XG5cblx0XHRwaXBlbGluZVByb2QuYWRkQXBwbGljYXRpb25TdGFnZShkZXBsb3lQcm9kKTtcblx0fVxufVxuIl19