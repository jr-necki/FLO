package com.example.flo

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.flo.databinding.ActivityLoginBinding
import com.example.flo.databinding.ActivitySignupBinding

class SignUpActivity : AppCompatActivity() {
    lateinit var binding: ActivitySignupBinding

    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        binding = ActivitySignupBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.finishIv.setOnClickListener {
            signUp()
            //로그인 화면으로
            finish()
        }
    }

    private fun getUser(): User {
        val email : String = binding.emailIdEt.text.toString()+"@"+binding.emailSiteEt.text.toString()
        val pwd : String = binding.pwEt.text.toString()

        return User(email,pwd)
    }

    private fun signUp(){
        if(binding.emailIdEt.text.toString().isEmpty() || binding.emailSiteEt.text.toString().isEmpty()){
            Toast.makeText(this,"이메일 형식이 잘못되었습니다.", Toast.LENGTH_SHORT).show()
            return
        }
        if(binding.pwEt.text.toString() != binding.pwCheckEt.text.toString()){
            Toast.makeText(this,"비밀번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show()
            return
        }

        val userDB = SongDatabase.getInstance(this)!!
        userDB.userDao().insert(getUser())

        val users = userDB.userDao().getUsers()
        Log.d("SINGUP",users.toString())
    }
}