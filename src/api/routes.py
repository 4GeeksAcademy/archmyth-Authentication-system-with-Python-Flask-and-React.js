"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import hashlib
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def new_user():
    body = request.json
    try:
        hashed_password = hashlib.md5( body['password'].encode('utf-8') ).hexdigest()
        new_user = User(body['email'], hashed_password)
        print(new_user)
        db.session.add(new_user)
        db.session.commit()
        access_token= create_access_token(identiy=email)
        return jsonify(new_user.serialize(), access_token), 200
    except:
        return jsonify(ValueError), 500
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email == None or password == None:
        return jsonify({"msg": "Bad email or password ⛔️"}), 401
    access_token= create_access_token(identiy=email)
    return jsonify(access_token=access_token)
    

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email == None or password == None:
        return jsonify({"msg": "Bad email or password ⛔️"}), 401
    
    search_user = User.query.filter_by(email=email).one_or_none()
    if search_user == None:
        return jsonify({"message": "user not found "}), 404
    if search_user.password == hashlib.md5(password.encode('utf-8') ).hexdigest():
        return jsonify({ "token" : create_access_token(identity=search_user.email) }), 200

    # handling errors
    return jsonify({"message": "password doesnt match, be carefull 🔓️ "}), 401


@api.route("/private", methods=["GET"])
@jwt_required()
def get_hello():
    email = get_jwt_identity()
    dictionary = {"message": email}
    return jsonify(dictionary)