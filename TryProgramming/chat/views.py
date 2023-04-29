import math
import random
from django.db.models import Max
from django.db.models import Q
from django.shortcuts import render
from random import randint
from . models import *
from . serializers import *
from . serializer import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
# Create your views here.


class CommentViewSet(ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        topics = Topic.objects.all()
        topic = topics.get(id=3)
        print(topic.comment.all())
        comment = self.queryset.filter(id=91).first()
        # reveal = comment.replies.all()
        # print('reveal', reveal)
        # see = topics.comment.all()
        # see = topics.topic_set.all()
        # b = self.queryset.filter(topic__in=topics)
        # print('sd', b)
        # return self.queryset.filter(topic__in=topics)
        return self.queryset
        # return self.queryset.filter(topic__in=topics)

    def perform_create(self, serializer, *args, **kwargs):
        data = self.request.data
        topics = Topic.objects.all()
        # print('create', data)
        comments = data['comments']
        topic = data['topic']
        get_topic = topics.get(id=topic)
        # print('get_topic', get_topic.topic)
        topicss = get_topic.comment.all()
        # sap = [c.participants for c in topicss]
        # print('save', sap)
        # for c in topicss:
        #     if c.participants:
        #         # print('night', c.participants)
        #         if self.request.user in c.participants.all():
        #             print('trUE')
        #         else:
        #             c.participants.add(self.request.user)

        #     else:
        #         c.participants.add(self.request.user)
        #     c.save()

        #     # print('false')
        # likes = get_topic.like.all()
        # if likes:
        #     print('if likes')
        # else:
        #     likes.create(user=self.request.user, topic=get_topic,
        #                  )
        serializer.save(topic=get_topic, comments=comments,
                        host=self.request.user,)


# def get_queryset(self):
#     qs = Product.objects.all()
#     q = self.request.GET.get(
#         'q') if self.request.GET.get('q') != None else ''
#     if q:
#         qs = qs.filter(Q(name__contains=q) |
#                        Q(category__name__contains=q) |
#                        #    Q(discount__contains=q) |
#                        Q(id__icontains=q)).distinct()

#     # return self.queryset
#     return qs


class TopicViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    parser_classes = (MultiPartParser, FormParser)
    lookup_field = 'slug'
    count = Topic.objects.count()

    def get_queryset(self):
        qs = Topic.objects.all()
        q = self.request.GET.get(
            'q') if self.request.GET.get('q') != None else ''
        if q:
            qs = qs.filter(Q(topic__icontains=q) |
                           Q(description__icontains=q) |
                           Q(created_by__username__icontains=q) |
                           Q(id__icontains=q)).distinct()

        # return self.queryset
        return qs

        # return self.queryset.all()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(created_by=user)

    def perform_update(self, serializer):
        data = self.request.data
        print('my data',  data)
        serializer.save()

    def get_random_item(model, max_id=None):
        if max_id is None:
            max_id = model.objects.aggregate(Max('id')).values()[0]
        min_id = math.ceil(max_id*random.random())
        return model.objects.filter(id__gte=min_id)[0]


class FieldViewSet(ModelViewSet):
    queryset = Field.objects.all()
    serializer_class = FieldSerializer


@api_view(['GET', 'PUT', ])
def comments(request, *args, **kwargs):
    comment = Comments.objects.all()
    topic = Topic.objects.all()
    user = request.user

    if request.method == 'GET':
        see = user.host.all()
        topics = Topic.objects.all()
        topic = topics.get(id=1)
        come = comment.filter(topic__id=3)
        print('aaaaaaa', topic)
        serializer = CommentSerializer(come, many=True)
        return Response(serializer.data)
        pass

    if request.get == 'PUT':
        data = request.data
        print('data   ', data)

    return Response()


@api_view(['GET', 'PUT', ])
def add_like(request, *args, **kwargs):
    if request.method == "GET":

        topic = Topic.objects.all()
        serializer = TopicSerializer(topic, many=True, context={
            'request': request})

        print('kwargs', kwargs.get('pk'))
        if kwargs:

            filtered_topics = topic.get(id=kwargs['pk'])
            data = TopicSerializer(filtered_topics, many=False, context={
                                   'request': request})
            return Response(data.data)

        return Response(serializer.data)
        pass

    if request.method == "PUT":
        topic = Topic.objects.all()
        data = request.data
        get_id = data['id']
        filtered_topic = topic.get(id=get_id)
        b = filtered_topic.like.all()
        c = b.first()
        print('b', b, 'c', c)

        likes = filtered_topic.like.all()
        print('b', b, 'c', c, 'likes', likes)
        if likes:
            print('b', b, 'c', c, 'likes', likes)
            if request.user in c.participants.all():
                pass
            else:
                # print('false')
                new_number = c.likes + 1

                c.likes = new_number
                c.participants.add(request.user)
                c.save()
        else:
            create_like = likes.create(user=request.user, topic=filtered_topic, likes=1,
                                       )
            create_like.participants.add(request.user)
            create_like.save()
        # serializer.save(topic=filtered_topic, comments=comments,
        #                 host=request.user,)

    data = TopicSerializer(filtered_topic, many=False, context={
        'request': request})
    return Response(data.data)


class ResponseViewSet(ModelViewSet):
    queryset = Responses.objects.all()
    serializer_class = ResponseSerializer


class LikeViewSet(ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def get_queryset(self):
        topic = Topic.objects.get(id=3)
        see = topic.like.all()
        # print('senior', see)
        return super().get_queryset()
