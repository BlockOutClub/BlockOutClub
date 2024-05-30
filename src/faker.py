import json
import uuid

from faker import Faker

fake = Faker()

tags = [
    "zionist",
    "child-killer",
    "Israeli army",
    "genocide",
    "pro-palestine",
    "anti-occupation",
    "human-rights",
    "anti-war",
]

keywords_map = {
    "zionist": ["zionist", "supporting Zionism", "Israeli army"],
    "child-killer": ["killing children", "genocide", "war crimes"],
    "Israeli army": ["Israeli army", "genocide", "supporting Zionism"],
    "genocide": ["genocide", "war crimes", "killing children"],
}


def generate_user():
    tag = fake.random_element(tags)
    keywords = keywords_map[tag]

    return {
        "id": str(uuid.uuid4()),
        "name": fake.name(),
        "username": fake.user_name(),
        "platform": "Twitter",
        "image": fake.image_url(),
        "keywords": keywords,
        "tag": tag,
    }


number_of_users = 50
users = [generate_user() for _ in range(1, number_of_users + 1)]

with open("src/data/users.json", "w") as f:
    json.dump(users, f, indent=2)

print("Generated data.json with users:", users)
