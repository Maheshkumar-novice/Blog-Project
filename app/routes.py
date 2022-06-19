from xml.dom import UserDataHandler
from app import app, db
from app.forms import LoginForm, RegistrationForm, EditProfileForm, EmptyForm, PostForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Post
from app.response import Response
import json

@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
@login_required
def index():
    posts = current_user.followed_posts().all()
    return Response.success('success',json.dumps(posts))

@app.route('/post', methods=['POST'])
@login_required
def post():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(body=form.post.data, author=current_user)
        db.session.add(post)
        db.session.commit()
        return Response.success('sucess', {'message': 'Your post is now live!'})
    else:
       return Response.error(400, json.dumps(form.errors)) 

@app.route('/login', methods=['POST'])
def login():
    if current_user.is_authenticated:
        return Response.success('success', {'message': 'Already logged in!'})
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            return Response.error(400, 'Invalid username or password')
        login_user(user, remember=form.remember_me.data)
        return Response.success('success', {'message': 'Successfully logged in!'})
    else:
        return Response.error(400, json.dumps(form.errors))


@app.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return Response.success('success', {'message': 'Successfully logged out!'})


@app.route('/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        return Response.success('success', {'message': 'Already logged in!'})
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        return Response.success('success', 'Congratulations, you are now a registered user!')
    else:
        return Response.error(400, json.dumps(form.errors))


@app.route('/user/<username>', methods=['GET'])
@login_required
def user(username):
    user = User.query.filter_by(username=username).first()
    posts = user.posts.order_by(Post.timestamp.desc())
    if user:
        user_data = user.data()
        return Response.success('sucess', {'message': 'User Data and Posts', 
                                'user_data': user_data})
    else:
        return Response.error(404, 'User not found!')


@app.route('/edit_profile', methods=['POST'])
@login_required
def edit_profile():
    form = EditProfileForm(current_user.username)
    if form.validate_on_submit():
        current_user.username = form.username.data
        current_user.about_me = form.about_me.data
        db.session.commit()
        return Response.success('success', {'message': 'Your changes have been saved.'})
    else:
        Response.error(400, 'Validation error! Please check the data!')


@app.route('/follow/<username>', methods=['POST'])
@login_required
def follow(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=username).first()
        if user is None:
            return Response.error(404, f'User {username} not found.')
        if user == current_user:
            return Response.error(400, 'You cannot follow yourself!')
        current_user.follow(user)
        db.session.commit()
        return Response.success('success', {'message': f'You are following {username}'})
    else:
        return Response.error(400, 'Validation error! Please check the data!')


@app.route('/unfollow/<username>', methods=['POST'])
@login_required
def unfollow(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=username).first()
        if user is None:
            return Response.error(404, f'User {username} not found.')
        if user == current_user:
            return Response.error(400, 'You cannot unfollow yourself!')
        current_user.unfollow(user)
        db.session.commit()
        return Response.success('success', {'message': f'You are not following {username}'})
    else:
        return Response.error(400, 'Validation error! Please check the data!')


@app.route('/explore', methods=['GET'])
@login_required
def explore():
    posts = Post.query.order_by(Post.timestamp.desc()).all()
    return Response.success('success', {'message': 'All posts', 'posts': json.dumps(posts, default=Post.data)})

