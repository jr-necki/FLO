package com.example.flo

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.flo.databinding.ActivityLoginBinding


class LoginActivity : AppCompatActivity() {
    lateinit var binding:ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.signupTv.setOnClickListener {
            startActivity(Intent(this,SignUpActivity::class.java))
        }
        binding.loginIv.setOnClickListener {
            login()

        }
    }

    private fun login(){
        if(binding.emailIdEt.text.toString().isEmpty() || binding.emailSiteEt.text.toString().isEmpty()){
            Toast.makeText(this,"이메일 형식이 잘못되었습니다.", Toast.LENGTH_SHORT).show()
            return
        }
        if(binding.pwEt.text.toString().isEmpty()){
            Toast.makeText(this,"비밀번호를 입력하세요.", Toast.LENGTH_SHORT).show()
            return
        }

        val email : String = binding.emailIdEt.text.toString()+"@"+binding.emailSiteEt.text.toString()
        val pwd : String = binding.pwEt.text.toString()

        // 위의 정보가 디비에 있는지 확인
        val songDB = SongDatabase.getInstance(this)!!
        val user = songDB.userDao().getUser(email,pwd)

        user?.let {
            Log.d("LOGIN_GETUSER","userId: ${user.id}, $user")
            //발급받은 jwt를 저장해주는 함수
            saveJwt(user.id)
            startMainActivity()
        }
        Toast.makeText(this,"회원 정보가 존재하지 않습니다.", Toast.LENGTH_SHORT).show()

    }
    private fun startMainActivity(){
        val intent= Intent(this,MainActivity::class.java)
        startActivity(intent)
    }
    private fun saveJwt(jwt : Int){
        val spf = getSharedPreferences("auth", MODE_PRIVATE)
        val editor = spf.edit()

        editor.putInt("jwt",jwt)
        editor.apply()
    }

}