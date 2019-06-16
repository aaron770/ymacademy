import { Component } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
// import { userInfo } from 'os';
// import * as firebase from 'firebase';
import { AngularFireStorageModule, AngularFireUploadTask } from 'angularfire2/storage';
import { UploadFileService } from '../../shared/services/upload-file.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../../core/auth.service';
import { User } from '../../core/user';
// import { UploadFile } from 'src/app/shared/models/upload-file';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss']
})
export class RecordingComponent {

   // Lets initiate Record OBJ
    private record;
    // Will use this flag for detect recording
    private recording = false;
    // Url of Blob
    private url;
    private error;
    // will change this based on school teacher student filename will be lesson name
    private basePath = '/uploads';
    private uploadTask: AngularFireUploadTask;
    private user: User;
    constructor(private authService: AuthService,
        private afs: AngularFirestore,
        // private uploadFile: UploadFile,
        private uploadFileService: UploadFileService,
        private domSanitizer: DomSanitizer,
        private http: HttpClient) {
    }
    sanitize(url: string) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
    /**
     * Start recording.
     */
    initiateRecording() {

        this.recording = true;
        const mediaConstraints = {
            video: false,
            audio: true
        };
        navigator.mediaDevices
            .getUserMedia(mediaConstraints)
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));
    }
    /**
     * Will be called automatically.
     */
    successCallback(stream) {
        const options = {
            mimeType: 'audio/wav',
            numberOfAudioChannels: 1
        };
        // Start Actuall Recording
        const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
        this.record = new StereoAudioRecorder(stream, options);
        this.record.record();
    }
    /**
     * Stop recording.
     */
    stopRecording() {
        this.recording = false;
        this.record.stop(this.sendRecording.bind(this));
    }
    /**
     * processRecording Do what ever you want with blob
     * @param {any} blob Blog
     */
    processRecording(blob) {
        // URL is not supported in ie 11 but neither is recording
        this.url = URL.createObjectURL(blob);
    }
    /**
     * sendRecording Do what ever you want with blob
     * @param {any} blob Blog
     */
    sendRecording(blob) { // need to change blob to upload
        // https://www.youtube.com/watch?v=5qoU1EirSmo
        console.log('blob', blob);
    this.authService.user.subscribe((user: User) => {
        this.user = user;
        const keriahDocsRef: AngularFirestoreDocument<any> = this.afs.doc(`reportCards/123${user.currentClass}/${user.uid}/keriah`);
        const uploadFile = {$key: 123,
            file: blob,
            name: 'does it work',
            url: URL.createObjectURL(blob),
            progress: 123 }; // new UploadFile(blob);

        this.uploadFileService.pushload(uploadFile, keriahDocsRef);
        console.log( 'pushed');
    });
        // this.uploadTask = storageRef.child(`${this.basePath}/
        // ${school}/
        // ${teacher}/
        // ${student}/
        // ${lesson}`).put(blob.file);
        // this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        //     (snapshot) => {
        //          upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     },
        //     (error) => {
        //         console.log(error);
        //     });
        // const amazonUrl = 'http://../blah';
        // const data = new FormData();
        // data.append('audioBlob', blob);
        // data.append('audio-filename', blob.name);
        // data.append('userName', userName)
        // data.append('userLesson', userLesson)
        // this.http.post(amazonUrl, blob);
    }
    /**
     * Process Error.
     */
    errorCallback(error) {
        this.error = 'Can not play audio in your browser';
    }
}
