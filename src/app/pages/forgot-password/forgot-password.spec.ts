import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ForgotPassword } from './forgot-password';
import { NotificationService } from '../../services/notification-service';

describe('ForgotPassword', () => {
  let component: ForgotPassword;
  let fixture: ComponentFixture<ForgotPassword>;
  let router: Router;
  let notificationService: jasmine.SpyObj<NotificationService>;

  const createComponent = (token: string | null) => {
    notificationService = jasmine.createSpyObj('NotificationService', ['open']);

    TestBed.configureTestingModule({
      imports: [ForgotPassword],
      providers: [
        provideRouter([]),
        provideAnimationsAsync(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'token' ? token : null),
              },
            },
          },
        },
        { provide: NotificationService, useValue: notificationService },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(ForgotPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create', () => {
    createComponent('token-teste-123');
    expect(component).toBeTruthy();
  });

  it('should redirect to login when token is invalid', fakeAsync(() => {
    createComponent('invalid-token');
    tick();

    expect(notificationService.open).toHaveBeenCalledWith(
      'Token inválido ou expirado. Solicite um novo link de recuperação.',
      'Fechar',
      'error'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should redirect to login when token is missing', fakeAsync(() => {
    createComponent(null);
    tick();

    expect(notificationService.open).toHaveBeenCalledWith(
      'Token inválido ou expirado. Solicite um novo link de recuperação.',
      'Fechar',
      'error'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should not redirect when token is valid', fakeAsync(() => {
    createComponent('token-teste-123');
    tick();

    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('should redirect to login after password reset', () => {
    createComponent('token-teste-123');

    component.handleResetPassword({ password: 'newPassword123', confirmPassword: 'newPassword123' });

    expect(notificationService.open).toHaveBeenCalledWith(
      'Senha redefinida com sucesso! Faça login com sua nova senha.',
      'OK',
      'success'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
