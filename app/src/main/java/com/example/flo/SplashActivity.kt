package com.example.flo

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity
import com.example.flo.databinding.ActivitySplashBinding

class SplashActivity: AppCompatActivity() {
    lateinit var binding: ActivitySplashBinding // xml파일과 연결

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding= ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // worker thread가 viewLandering을 하기위해
        // Looper: 전달해주는 역할
        Handler(Looper.getMainLooper()).postDelayed({
           // go to mainActivity
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        },2000) //2초
    }
}