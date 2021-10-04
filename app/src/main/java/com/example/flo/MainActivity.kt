package com.example.flo

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.flo.databinding.ActivityMainBinding


class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding
    var isPlay: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)

        setContentView(binding.root)

        val song = Song(binding.mainMiniPlayerTitleTv.text.toString(),
        binding.mainMiniPlayerSingerTv.text.toString())

        Log.d("Log test",song.singer + song.title)

        // 작업할 레이아웃과 바인딩
        binding.mainPlayerLayout.setOnClickListener{
            // this여기서 songActivity로 보낸다.
            //startActivity(Intent(this, SongActivity::class.java));
            val intent = Intent(this, SongActivity::class.java)
            intent.putExtra("title",song.title)
            intent.putExtra("singer",song.singer)
            intent.putExtra("isPlay",isPlay)
            startActivity(intent)
        }

        initNavigation()

        binding.mainBnv.setOnItemSelectedListener {
            when (it.itemId) {
                R.id.homeFragment -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.main_frm, HomeFragment())
                        .commitAllowingStateLoss()
                    return@setOnItemSelectedListener true
                }

                R.id.lookFragment -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.main_frm, LookFragment())
                        .commitAllowingStateLoss()
                    return@setOnItemSelectedListener true
                }

                R.id.searchFragment -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.main_frm, SearchFragment())
                        .commitAllowingStateLoss()
                    return@setOnItemSelectedListener true
                }

                R.id.lockerFragment -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.main_frm, LockerFragment())
                        .commitAllowingStateLoss()
                    return@setOnItemSelectedListener true
                }

            }
            false
        }

    }

    private fun setPlayNow(b: Boolean): Boolean {
        if(b){//이미 재생중이라면
            binding.mainMiniplayerBtn.visibility=View.GONE
            binding.mainPauseBtn.visibility = View.VISIBLE
        }else{// 이미 정지중이라면
            binding.mainMiniplayerBtn.visibility=View.VISIBLE
            binding.mainPauseBtn.visibility=View.GONE
        }
        return isPlay

    }


    private fun initNavigation() {
        supportFragmentManager.beginTransaction().replace(R.id.main_frm, HomeFragment())
            .commitAllowingStateLoss()

    }

}

