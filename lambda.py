import json
import boto3
import urllib.request

s3 = boto3.client('s3')

def lambda_handler(event, context):
    api_url = 'https://mocki.io/v1/5cc783ca-548c-48d9-8041-e467bc522055'

    try:
        # Fetch data from the API
        with urllib.request.urlopen(api_url) as response:
            users = json.loads(response.read().decode())

        # Initialize counters
        country_count = {}
        age_count = { "10-20": 0, "21-30": 0, "31-40": 0 }
        gender_count = { "man": 0, "woman": 0 }
        daily_views = {}

        for user in users:
            # Count by country
            country = user.get('country', 'unknown')
            country_count[country] = country_count.get(country, 0) + 1

            # Count by age
            age = user['age']
            if 10 <= age <= 20:
                age_count["10-20"] += 1
            elif 21 <= age <= 30:
                age_count["21-30"] += 1
            elif 31 <= age <= 40:
                age_count["31-40"] += 1

            # Count by gender
            gender = user['gender']
            if gender in gender_count:
                gender_count[gender] += 1

            # Calculate daily views
            user_daily_views = []
            for day in user['days']:
                day_id = day['id']
                views = int(day['views'])
                user_daily_views.append({'day': day_id, 'views': views})

            # Append to daily_views
            daily_views[user['usrname']] = user_daily_views

        processed_data = {
            'countryCount': country_count,
            'ageCount': age_count,
            'genderCount': gender_count,
            'dailyViews': daily_views
        }

        # Store processed data in S3
        s3.put_object(
            Bucket='your-bucket',
            Key='processed-users.json',
            Body=json.dumps(processed_data),
            ContentType='application/json'
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Data processed and stored in S3'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error processing data', 'error': str(e)})
        }