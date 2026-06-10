package com.example.Karnam;

import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@SpringBootApplication
@RestController
public class KarnamApplication {

	public static void main(String[] args) {
		SpringApplication.run(KarnamApplication.class, args);
	}

  ChatModel model = OpenAiChatModel.builder()
    .apiKey("demo")
    .modelName("gpt-4o-mini")
    .maxTokens(1000)
    .build();

  @GetMapping("/")
  public String nt(@RequestParam String name)
  {
    return model.chat(name);


  }

}
