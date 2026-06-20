package com.example.Karnam;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

import net.sourceforge.tess4j.Tesseract;

public class OCR{
  
  
  MultipartFile img; 
    
  Tesseract tess= new Tesseract();
  File file = new File("/home/anand_yasheswi/img.png");

  public OCR(MultipartFile img){

    this.img = img;

    tess.setDatapath("/usr/share/tesseract-ocr/5/tessdata/");
    tess.setLanguage("eng");

  }

  public String getText(){
    
    try{

    img.transferTo(file);
      return tess.doOCR(file);
    }
    catch(Exception e){
      return e.getMessage();
    }

  }

  


}
