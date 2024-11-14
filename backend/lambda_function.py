import boto3
import json
import base64
import os
import time

transcribe = boto3.client('transcribe')

# NOTE: DEPRECIATED
# bedrock = boto3.client('bedrock-runtime')

# TODO: Having issues with file sizes being too small for Amazon Transcribe to process,
#       likely an issue with how the frontend sends the audio data. Will need to fix this
#       before moving forward with the project.
# NOTE: Api works successfully however, running into issues with lambda timing out or audio files
#       being too small for AWS Transcribe. Will look into this once I have more time.
def lambda_handler(event, context):

    if (event.get("httpMethod") == "OPTIONS"):
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            'body': ''
        }

   
    try:

        # Load base64 audio from JSON
        body = event.get('body')
        body = json.loads(body).get('body')
        audio_data_base64 = body.split('"audioData":')[1].split('"')[1]
        audio_data = base64.b64decode(audio_data_base64)

        # Convert base64 to .wav
        temp_audio_file = '/tmp/audio.wav'
        with open(temp_audio_file, 'wb') as f:
            f.write(audio_data)

        # Upload to s3 to use Amazon Transcribe
        s3 = boto3.client('s3')
        bucket_name = 'XXXXXXXXXX'
        s3_key = 'XXXXXXXXXX'
        s3.upload_file(temp_audio_file, bucket_name, s3_key)

        transcription_job_name = f"TranscriptionJob_{int(time.time())}"
        transcribe.start_transcription_job(
            TranscriptionJobName=transcription_job_name,
            LanguageCode='en-US',
            Media={'MediaFileUri': f's3://{bucket_name}/{s3_key}'},
            MediaFormat='wav',
            OutputBucketName=bucket_name
        )

        # Wait for job completion
        # NOTE: will change this in the future, don't love how this works
        status = 'IN_PROGRESS'
        while status == 'IN_PROGRESS':
            time.sleep(0.01)
            job = transcribe.get_transcription_job(TranscriptionJobName=transcription_job_name)
            status = job['TranscriptionJob']['TranscriptionJobStatus']
            if status == 'FAILED':
                raise Exception(f"Transcription job failed: {job['TranscriptionJob']['FailureReason']}")
            if status == 'COMPLETED':
                transcript_uri = job['TranscriptionJob']['Transcript']['TranscriptFileUri']
                print(f"Transcription completed. Transcript URL: {transcript_uri}")

                # NOTE: DEPRECIATED
                # enhanced_text = enhance_with_bedrock(transcript_uri)
                transcript_uri = job['TranscriptionJob']['Transcript']['TranscriptFileUri']
        response = requests.get(transcript_uri)
        transcript_data = response.json()
        transcript_text = transcript_data['results']['transcripts'][0]['transcript']

        # Return transcribed text
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({
                'message': f'Transcription job {transcription_job_name} completed successfully.',
                'transcript': transcript_text
            })
        }


    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps({'error': str(e)})
        }


# NOTE: Depreciated due to losing access to bedrock after hackathon
# TODO: Re-implement using openAI API as its cheaper
# def enhance_with_bedrock(transcript_uri):
#     try:
#         # Download transcription result
#         response = requests.get(transcript_uri)
#         text = response.json().get('results', {}).get('transcripts', [{}])[0].get('transcript', '')

#         # Use Amazon Bedrock to enhance the transcription text
#         response = bedrock.invoke_model(
#             modelId='anthropic.claude-3-5-sonnet-20240620-v1:0',  # Replace with the actual Bedrock model ID
#             contentType='text/plain',
#             accept='application/json',
#             body=json.dumps({"text": text})
#         )

#         # Parse the response from Bedrock
#         enhanced_text = json.loads(response['body'])['enhanced_text']
#         return enhanced_text

#     except Exception as e:
#         return f"Error enhancing text: {str(e)}"
