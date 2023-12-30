import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ButtonType, MukButtonTypes, MukThemePalette, TooltipPositions } from 'ngx-mui-kit/components/muk-button';
import { FormFieldInput } from 'ngx-mui-kit/components/muk-form/classes';
import { MukDynamicFormComponent } from "ngx-mui-kit/components/muk-form/muk-dynamic-form";

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [MukDynamicFormComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  formFields =  [
    new FormFieldInput({
      label: 'Email Address',
      key: 'email',
      value: '',
      validators: [Validators.required, Validators.email],
      parent: 'one',
      parentClass: 'test',
      class: 'col-md-12',
      fieldConfig: {
        type: 'email'
      }
    }),
    new FormFieldInput({
      label: 'Password',
      key: 'password',
      value: "",     
      class: 'col-md-12',
      parent: 'one',
      validators: [Validators.required],
      fieldConfig: {
        type: 'password',
      }
    }),
  ];

  buttons =  [
    {
      text: 'Save',
      isMukButton: false,
      isLoading: false,
      color: MukThemePalette.Primary,
      matType: MukButtonTypes.Raised,
      isDisabled: false,
      type: ButtonType.Submit,
      toolTip: {
        position: TooltipPositions.Below,
        toolTip: 'Test',
      },
    },
    {
      text: 'Cancel',
      isMukButton: false,
      isLoading: false,
      color: MukThemePalette.Warn,
      matType: MukButtonTypes.Flat,
      isDisabled: false,
      type: ButtonType.Button,
      toolTip: {
        position: TooltipPositions.Below,
        toolTip: 'Test',
      },
      onClick: () => {
        alert('test');
      },
      className:"mx-2"
    },
  ];
  buttonClass = 'justify-content-start' ; 
  isStickyForm =  false ;   
}
