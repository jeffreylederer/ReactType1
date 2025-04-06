using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactType1.Server.Models;
using ReactType1.Server.Contracts;
using AutoMapper;
using ReactType1.Server.DTOs.Membership;


//https://geeksarray.com/blog/implement-repository-pattern-with-aspnet-core-web-api
namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembershipsController(IMapper mapper,  IMembershipRepository membershipRepository) : ControllerBase
    {
        private readonly IMapper _mapper= mapper;
        private readonly IMembershipRepository _membershipRepository= membershipRepository;

        

        // GET: Memberships
        [HttpGet]
        public async Task<ActionResult<List<GetMembershipDetailsDto>>> Get()
        {
            var membership = await this._membershipRepository.Get();
            var records = _mapper.Map<List<GetMembershipDetailsDto>>(membership);
            return Ok(records);
        }

        // GET: Memberships/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetMembershipDetailsDto>> Get(int id)
        {
            var membership = await this._membershipRepository.GetOne(id);

            if (membership == null)
            {
                throw new Exception($"MembershipID {id} is not found.");
            }

            var membershipDetailsDto = _mapper.Map<GetMembershipDetailsDto>(membership);

            return Ok(membershipDetailsDto);
        }



        [HttpPost]
        public async Task<ActionResult<Membership>> Create(CreateMembershipDto createMembershipDto)
        {
            var membership = _mapper.Map<Membership>(createMembershipDto);

            await this._membershipRepository.Create(membership);
            return Ok(membership);
        }



        // POST: Memberships/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[ValidateAntiForgeryToken]
        [HttpPut("{id}")]
        public async Task<ActionResult<Membership>> Edit(int id, UpdateMembershipDto updateMembershipDto)
        {
            if (id != updateMembershipDto.Id)
            {
                return BadRequest("Invalid Membership Id");
            }

            var membership = await _membershipRepository.GetOne(id);

            if (membership == null)
            {
                throw new Exception($"MembershipID {id} is not found.");
            }

            _mapper.Map(updateMembershipDto, membership);

            try
            {
                await _membershipRepository.Edit(membership);
            }
            catch (Exception)
            {
                throw new Exception($"Error occured while updating MembershipID {id}.");
            }

            return Ok(membership); 
        }


        // GET: Memberships/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _membershipRepository.Delete(id);
            return NoContent();
        }

        
    }
}
