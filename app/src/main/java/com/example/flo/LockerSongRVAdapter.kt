package com.example.flo

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.flo.databinding.ItemLockerSongBinding

class LockerSongRVAdapter(private val songlist : ArrayList<LockerSong>):
RecyclerView.Adapter<LockerSongRVAdapter.ViewHolder>(){

    // 클릭 인터페이스 정의
    interface MyItemClickListener{
        fun onItemClick(song : LockerSong)
        fun onRemoveSong(position: Int)
    }
    //객체를 저장하는 변수
    private lateinit var mItemClickListener: MyItemClickListener
    // 리스너 객체를 전달받는 함수랑 리스너
    fun setMyItemClickListener(itemClickListener: MyItemClickListener){
        mItemClickListener = itemClickListener
    }

    // 뷰홀더를 생성해줘야 할 때 호출되는 함수 => 아이템 뷰 객체를 만들어서 뷰 홀더에 던져줌
    // 몇 번 호출되고 끝
    override fun onCreateViewHolder(
        viewGroup: ViewGroup,
        viewType: Int
    ): LockerSongRVAdapter.ViewHolder {
        val binding: ItemLockerSongBinding = ItemLockerSongBinding.inflate(LayoutInflater
            .from(viewGroup.context),viewGroup,false)

        return ViewHolder(binding) // 뷰 홀더 던져준다.
    }

    fun addItem(song:LockerSong){
        songlist.add(song)
        notifyDataSetChanged()
    }
    fun removerItem(position: Int){
        songlist.removeAt(position)
        notifyDataSetChanged()
    }


    // 뷰 홀더에 데이터를 바인딩 할 때마다 호출 => 많이 호출
    override fun onBindViewHolder(holder: LockerSongRVAdapter.ViewHolder, position: Int) {
       holder.bind(songlist[position])
        holder.binding.lockerDeleteIv.setOnClickListener {
            //삭제하는 함수
            holder.binding.lockerDeleteIv.setOnClickListener {
                mItemClickListener.onRemoveSong(position)
            }
        }
    }

    override fun getItemCount(): Int = songlist.size

    //View Holder
    inner class ViewHolder(val binding: ItemLockerSongBinding) : RecyclerView.ViewHolder(binding.root){
        // binding
        fun bind(lockerSong : LockerSong){
            binding.lockerSongTitleTv.text = lockerSong.title
            binding.lockerSongSingerTv.text = lockerSong.singer
            binding.lockerCoverIv.setImageResource(lockerSong.coverImg!!)
        }
    }

}