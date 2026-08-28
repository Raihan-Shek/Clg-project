from typing import ClassVar

from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.db import models
from django.utils import timezone


class Student(models.Model):
    GENDER_CHOICES: ClassVar[list[tuple[str, str]]] = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    STATUS_CHOICES: ClassVar[list[tuple[str, str]]] = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('graduated', 'Graduated'),
        ('suspended', 'Suspended'),
    ]

    # Identification
    student_id = models.CharField(
        max_length=20,
        unique=True,
        editable=False,
        help_text="Auto-generated unique student ID",
    )
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    # Contact info
    email = models.EmailField(unique=True)
    phone_regex = RegexValidator(
        regex=r"^\+?1?\d{9,15}$",
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)

    # Personal details
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    address = models.TextField(blank=True)

    # Academic info
    enrollment_date = models.DateField(default=timezone.now)
    course = models.CharField(max_length=100, blank=True)
    grade_level = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(12)]
    )
    gpa = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(4.0)],
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="active")

    # Optional profile picture
    profile_picture = models.ImageField(
        upload_to="students/profile_pics/", blank=True, null=True
    )

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering: ClassVar[list[str]] = ["last_name", "first_name"]
        verbose_name = "Student"
        verbose_name_plural = "Students"

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student_id})"

    def save(self, *args, **kwargs):
        if not self.student_id:
            self.student_id = self.generate_student_id()
        super().save(*args, **kwargs)

    def generate_student_id(self):
        year = timezone.now().year
        last_student = (
            Student.objects.filter(student_id__startswith=f"STU{year}")
            .order_by("student_id")
            .last()
        )
        if last_student:
            last_number = int(last_student.student_id[-4:])
            new_number = last_number + 1
        else:
            new_number = 1
        return f"STU{year}{new_number:04d}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def age(self):
        if self.date_of_birth:
            today = timezone.now().date()
            return (
                today.year
                - self.date_of_birth.year
                - (
                    (today.month, today.day)
                    < (self.date_of_birth.month, self.date_of_birth.day)
                )
            )
        return None
