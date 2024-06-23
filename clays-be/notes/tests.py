from django.test import TestCase
from rest_framework.test import APITestCase,APIRequestFactory
from rest_framework import status
from .views import NoteViewSet
from .models import Note

class ClaysTestSetUp(APITestCase):
    def setUp(self):
        self.view = NoteViewSet.as_view({'get':'list','post':'create','patch':'partial_update','delete':'destroy'})
        self.factory = APIRequestFactory()
        self.note = Note.objects.create(title = "Test Title 2", content = "Test Content 2")
        return super().setUp()

    def tearDown(self) -> None:
        return super().tearDown()
    
class ClaysTestViews(ClaysTestSetUp):
    def test_create_note(self):
        request = self.factory.post('api/notes',{
            "title": "Test Title",
            "content": "Test Content"
        })
        response = self.view(request)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED) 
        self.assertDictContainsSubset( { "title": "Test Title",
            "content": "Test Content"},response.data,)
        
    def test_get_note(self):
    
        request = self.factory.get(f'api/notes/{self.note.id}')
        view = NoteViewSet.as_view({'get':"retrieve"})
        response = view(request,pk = self.note.id)
        self.assertEqual(response.status_code,status.HTTP_200_OK) 
        self.assertDictContainsSubset( { "title": "Test Title 2",
            "content": "Test Content 2"},response.data,)
        
    def test_get_notes(self):
    
        request = self.factory.get(f'api/notes')
        response = self.view(request)
        self.assertEqual(response.status_code,status.HTTP_200_OK) 
        self.assertTrue( len(response.data) == 1)
        self.assertDictContainsSubset( { "title": "Test Title 2",
            "content": "Test Content 2"},response.data[0],)
        
    def test_edit_note(self):
        
        request = self.factory.patch(f'api/notes/{self.note.id}',{
            "title": "Test Title 3"
        })
        response = self.view(request, pk = self.note.id)
        self.assertEqual(response.status_code,status.HTTP_200_OK) 
        self.assertDictContainsSubset( { "title": "Test Title 3"},response.data,)

    def test_delete_note(self):
        
        request = self.factory.delete(f'api/notes/{self.note.id}')
        response = self.view(request, pk = self.note.id)
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT) 
      