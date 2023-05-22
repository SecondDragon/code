import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

import { environment } from '@env/environment';
import { PageHeaderType } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichTextComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '富文本，人们总是喜欢用花里胡哨的文字，表达自己空虚的情感',
    breadcrumb: ['首页', '扩展功能', '富文本']
  };
  localUrl = 'http://139.9.225.248:8088';
  uploadRichFileUrl = environment.production ? `${this.localUrl}/rich-upload` : '/site/rich-upload';
  validateForm = this.fb.group({
    detail: ['', [Validators.required]]
  });

  // 所有配置
  // http://tinymce.ax-z.cn/configure/editor-appearance.php
  editInit = {
    // automatic_uploads: false,
    images_upload_url: this.uploadRichFileUrl,
    branding: false, // 隐藏右下角技术支持
    height: 500,
    convert_urls: false, // 上传的图片路径不转成相对路径
    menubar: false,
    plugins: ['image'],
    fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
    language: 'zh_CN',
    // images_upload_handler: function (blobInfo: any, success: (arg0: string) => void, failure: any) {
    //   console.log(blobInfo);
    //   console.log(success);
    //   /* no matter what you upload, we will turn it into TinyMCE logo :)*/
    //   // success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
    // },
    toolbar: '|bold|fontselect|fontsizeselect|styleselect|removeformat|aligncenter  alignright alignjustify | image'

    // image_caption: true,
    // paset 插件允许粘贴图片
    // paste_data_images: true,
    // image_advtab: true,
    // imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
  };

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {}
}
