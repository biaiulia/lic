import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {ProfileEditComponent} from '../user/profile-edit/profile-edit.component'

@Injectable()
export class UnsavedChanges implements CanDeactivate<ProfileEditComponent>{
    canDeactivate(component: ProfileEditComponent){
        if(component.editForm.dirty){
            return confirm('Sigur vrei sa parasesti pag? Se vor pierde modificarile');
        }
       // return false;
    }
}