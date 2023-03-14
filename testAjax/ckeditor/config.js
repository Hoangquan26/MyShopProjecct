/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.filebrowserBrowseUrl = "~/ckfinder/ckfinder.html";
    config.filebrowserImageUrl = "~/ckfinder/ckfinder.html?type=Images";
    config.filebrowserFlashUrl = "~/ckfinder/ckfinder.html?type=Flash";
    config.filebrowserUploadUrl = "~/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files";
    config.filebrowserImageUploadUrl = "~/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images";
    config.filebrowserFlashUploadUrl = "~/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash";
    config.filebrowserWindowWidth = '1000';
    config.filebrowserWindowHeight = '700';
    config.extraPlugins = 'youtube';
    config.youtube_responsive = true;
};
