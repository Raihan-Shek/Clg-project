# from django.contrib import admin

# from .models import Student

# admin.site.register(Student)


from django.contrib import admin

from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'full_name', 'email', 'status', 'gpa')
    list_filter = ('status', 'gender', 'grade_level')
    search_fields = ('first_name', 'last_name', 'email', 'student_id')
    ordering = ('last_name', 'first_name')